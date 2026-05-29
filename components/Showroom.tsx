"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { useI18n } from "@/lib/i18n";
import { makeMarbleCanvas } from "@/lib/marble-tex";

/* Scroll-driven WebGL marble showroom (Gallery mode, Drama lighting — fixed).
   Ported from the design's showroom.js; Three.js r128 loaded dynamically client-side. */
export function Showroom() {
  const { t } = useI18n();
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const stage = stageRef.current;
      const track = trackRef.current;
      if (!stage || !track) return;

      const webgl = (() => {
        try {
          const c = document.createElement("canvas");
          return !!(c.getContext("webgl") || c.getContext("experimental-webgl"));
        } catch {
          return false;
        }
      })();
      if (!webgl) {
        const fb = stage.querySelector<HTMLElement>("#stage-fallback");
        if (fb) fb.style.display = "grid";
        return;
      }

      // r128 API — typed loosely on purpose.
      const THREE = (await import("three")) as any;
      if (disposed) return;

      const MIX = ["white", "azure", "cream", "grey", "gold", "green", "rose", "black"];
      const texCache: Record<string, any> = {};
      const palAt = (i: number) => MIX[i % MIX.length];

      const renderer = new THREE.WebGLRenderer({
        antialias: true, alpha: false, powerPreference: "high-performance", preserveDrawingBuffer: true,
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      stage.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const fog = new THREE.Fog(0xe7e4dc, 22, 90);
      scene.fog = fog;
      const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, 0.1, 400);
      camera.position.set(0, 3.4, 17);

      // environment (soft studio gradient)
      const envTex = (() => {
        const c = document.createElement("canvas"); c.width = 512; c.height = 256;
        const x = c.getContext("2d")!;
        const g = x.createLinearGradient(0, 0, 0, 256);
        g.addColorStop(0, "#ffffff"); g.addColorStop(0.42, "#eef1f4");
        g.addColorStop(0.55, "#dfe5ea"); g.addColorStop(1, "#cdd2d6");
        x.fillStyle = g; x.fillRect(0, 0, 512, 256);
        const glow = (cx: number, cy: number, r: number, col: string) => {
          const rg = x.createRadialGradient(cx, cy, 0, cx, cy, r);
          rg.addColorStop(0, col); rg.addColorStop(1, "rgba(255,255,255,0)");
          x.fillStyle = rg; x.fillRect(0, 0, 512, 256);
        };
        glow(130, 70, 130, "rgba(255,252,242,0.95)");
        glow(380, 60, 120, "rgba(245,249,255,0.85)");
        glow(256, 232, 220, "rgba(120,150,175,0.2)");
        const t0 = new THREE.CanvasTexture(c);
        t0.mapping = THREE.EquirectangularReflectionMapping;
        const pm = new THREE.PMREMGenerator(renderer);
        const rt = pm.fromEquirectangular(t0);
        pm.dispose(); t0.dispose();
        return rt.texture;
      })();
      scene.environment = envTex;

      const tex = (pal: string, seed: number, tall: boolean) => {
        const k = pal + "|" + seed + "|" + (tall ? 1 : 0);
        if (texCache[k]) return texCache[k];
        const cv = makeMarbleCanvas({ pal, seed, tall, size: 768 });
        const tt = new THREE.CanvasTexture(cv);
        tt.encoding = THREE.sRGBEncoding;
        tt.anisotropy = renderer.capabilities.getMaxAnisotropy();
        texCache[k] = tt;
        return tt;
      };
      const marbleMat = (pal: string, seed: number, tall: boolean) =>
        new THREE.MeshPhysicalMaterial({
          map: tex(pal, seed, tall), roughness: 0.24, metalness: 0.0,
          clearcoat: 0.85, clearcoatRoughness: 0.16, envMapIntensity: 1.05, envMap: envTex,
        });

      // lighting — Drama preset (permanent)
      const hemi = new THREE.HemisphereLight(0xffffff, 0xb9bcc0, 0.4);
      scene.add(hemi);
      const key = new THREE.DirectionalLight(0xfff6e8, 1.9);
      key.position.set(12, 22, 10);
      key.castShadow = true;
      key.shadow.mapSize.set(2048, 2048);
      key.shadow.camera.near = 1; key.shadow.camera.far = 120;
      key.shadow.camera.left = -40; key.shadow.camera.right = 40;
      key.shadow.camera.top = 40; key.shadow.camera.bottom = -40;
      key.shadow.bias = -0.0004;
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xdfe9f2, 0.25);
      fill.position.set(-14, 9, -6); scene.add(fill);
      const rim = new THREE.DirectionalLight(0xffffff, 1.1);
      rim.position.set(0, 12, -28); scene.add(rim);
      renderer.toneMappingExposure = 1.08;
      scene.background = new THREE.Color(0xe7e4dc);

      const floorMat = new THREE.MeshStandardMaterial({
        color: 0xf3f1ea, roughness: 0.18, metalness: 0.0, envMap: envTex, envMapIntensity: 0.9,
      });
      const floor = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), floorMat);
      floor.rotation.x = -Math.PI / 2; floor.receiveShadow = true;
      scene.add(floor);

      // gallery — a luminous hall of slabs
      const spinners: any[] = [];
      const slabGeo = new THREE.BoxGeometry(3.4, 6.2, 0.42);
      const plinthGeo = new THREE.BoxGeometry(3.9, 0.5, 1.4);
      const plinthMat = new THREE.MeshStandardMaterial({ color: 0xe9e7df, roughness: 0.7, metalness: 0, envMap: envTex, envMapIntensity: 0.5 });
      const N = 8, gap = 9, xOff = 4.6;
      for (let i = 0; i < N; i++) {
        const side = i % 2 === 0 ? -1 : 1;
        const z = 6 - i * gap;
        const slab = new THREE.Mesh(slabGeo, marbleMat(palAt(i), 11 + i * 7, true));
        slab.position.set(side * xOff, 3.55, z);
        slab.rotation.y = side * -0.32 + (Math.random() - 0.5) * 0.05;
        slab.castShadow = true; slab.receiveShadow = true;
        const pl = new THREE.Mesh(plinthGeo, plinthMat);
        pl.position.set(side * xOff, 0.25, z);
        pl.rotation.y = slab.rotation.y; pl.castShadow = true; pl.receiveShadow = true;
        scene.add(slab); scene.add(pl);
        slab.userData.bob = Math.random() * 6.28; spinners.push(slab);
      }
      const pos = [
        new THREE.Vector3(0, 3.4, 17), new THREE.Vector3(2.4, 3.2, 8),
        new THREE.Vector3(-2.6, 3.6, 0), new THREE.Vector3(2.8, 3.2, -9),
        new THREE.Vector3(-2.6, 3.5, -19), new THREE.Vector3(2.2, 3.3, -29),
        new THREE.Vector3(-1.2, 3.7, -40), new THREE.Vector3(0, 4.2, -52),
        new THREE.Vector3(0, 5.0, -62),
      ];
      const look = pos.map((p: any) => new THREE.Vector3(p.x * -0.3, 3.4, p.z - 9));
      const camCurve = new THREE.CatmullRomCurve3(pos, false, "catmullrom", 0.4);
      const lookCurve = new THREE.CatmullRomCurve3(look, false, "catmullrom", 0.4);

      const state = { progress: 0, target: 0, active: true, mouse: { x: 0, y: 0 }, reduced: false };
      state.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const clock = new THREE.Clock();

      const update = (tp: number) => {
        tp = Math.max(0, Math.min(1, tp));
        const p = camCurve.getPointAt(tp);
        const l = lookCurve.getPointAt(tp);
        const px = state.mouse.x * 1.4, py = -state.mouse.y * 0.8;
        camera.position.set(p.x + px, p.y + py, p.z);
        camera.lookAt(l.x + px * 0.4, l.y + py * 0.4, l.z);
      };

      const chapters = Array.from(track.querySelectorAll<HTMLElement>(".chapter"));
      const rail = railRef.current;
      const hint = hintRef.current;
      const smooth = (p: number, a: number, b: number) => {
        const f = 0.05;
        if (p < a - f || p > b + f) return 0;
        if (p < a) return (p - (a - f)) / f;
        if (p > b) return Math.max(0, 1 - (p - b) / f);
        return 1;
      };
      const onScroll = () => {
        const h = track.offsetHeight - window.innerHeight;
        const p = h > 0 ? Math.min(1, Math.max(0, -track.getBoundingClientRect().top / h)) : 0;
        state.target = p;
        if (rail) rail.style.width = (p * 100).toFixed(2) + "%";
        if (hint) hint.style.opacity = p > 0.04 ? "0" : "1";
        for (const c of chapters) {
          const o = smooth(p, parseFloat(c.dataset.a || "0"), parseFloat(c.dataset.b || "0"));
          c.style.opacity = String(o);
          c.style.transform = `translateY(${(1 - o) * 26}px)`;
        }
      };
      const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        onScroll();
      };
      const onMove = (e: PointerEvent) => {
        state.mouse.x = e.clientX / window.innerWidth - 0.5;
        state.mouse.y = e.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onResize);
      window.addEventListener("pointermove", onMove, { passive: true });
      onScroll();

      const io = new IntersectionObserver((es) => { state.active = es[0].isIntersecting; }, { threshold: 0 });
      io.observe(track);

      let raf = 0;
      const loop = () => {
        raf = requestAnimationFrame(loop);
        if (!state.active) return;
        state.progress += (state.target - state.progress) * 0.07;
        const tt = clock.getElapsedTime();
        update(state.progress);
        for (const m of spinners) {
          if (m.userData.bob !== undefined && !state.reduced) {
            m.position.y = 3.55 + Math.sin(tt * 0.6 + m.userData.bob) * 0.06;
          }
        }
        renderer.render(scene, camera);
      };
      loop();

      cleanup = () => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onMove);
        io.disconnect();
        scene.traverse((o: any) => {
          if (o.geometry) o.geometry.dispose?.();
          if (o.material) {
            const mats = Array.isArray(o.material) ? o.material : [o.material];
            mats.forEach((mm: any) => { mm.map?.dispose?.(); mm.dispose?.(); });
          }
        });
        Object.values(texCache).forEach((tt: any) => tt.dispose?.());
        envTex.dispose?.();
        renderer.dispose();
        if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <>
      <div className="scroll-rail"><i ref={railRef} /></div>

      <div id="stage" ref={stageRef} aria-hidden="true">
        <div id="stage-fallback">
          <div style={{ textAlign: "center" }}>
            <div className="display" style={{ fontSize: "clamp(40px,8vw,90px)", color: "var(--ink)" }}>
              Allwin<em style={{ fontStyle: "italic", color: "var(--brass)" }}> Marbles</em>
            </div>
            <p style={{ marginTop: 16, fontFamily: "var(--mono)", letterSpacing: ".2em", textTransform: "uppercase", fontSize: 12 }}>
              {t("home.tagline")}
            </p>
          </div>
        </div>
      </div>

      <div className="track" ref={trackRef}>
        <div className="chapters">
          <div className="chapter center" data-a="0" data-b="0.10">
            <div className="holder">
              <p className="ch-eyebrow">{t("home.tagline")}</p>
              <h1 className="ch-title">Allwin<em> Marbles</em></h1>
              <p className="ch-line ch-soft" style={{ marginInline: "auto" }}>{t("home.heroLine")}</p>
            </div>
          </div>
          <div className="chapter" data-a="0.17" data-b="0.32">
            <div className="holder">
              <p className="ch-eyebrow">{t("home.introEyebrow")}</p>
              <h2 className="ch-title" style={{ fontSize: "clamp(34px,5vw,76px)" }}>{t("home.introTitle")}</h2>
            </div>
          </div>
          <div className="chapter center" data-a="0.38" data-b="0.54">
            <div className="holder">
              <p className="ch-eyebrow">{t("home.galleryEyebrow")}</p>
              <div className="stat-row">
                <div className="stat-fig"><div className="num">1985</div><div className="cap">{t("home.stat1")}</div></div>
                <div className="stat-fig"><div className="num">40<span className="sfx">+</span></div><div className="cap">{t("home.stat2")}</div></div>
                <div className="stat-fig"><div className="num">60<span className="sfx">+</span></div><div className="cap">{t("home.stat3")}</div></div>
                <div className="stat-fig"><div className="num">{t("home.stat4v")}</div><div className="cap">{t("home.stat4")}</div></div>
              </div>
            </div>
          </div>
          <div className="chapter right" data-a="0.60" data-b="0.76">
            <div className="holder">
              <p className="ch-eyebrow">{t("home.galleryEyebrow")}</p>
              <h2 className="ch-title" style={{ fontSize: "clamp(34px,5vw,80px)" }}>{t("home.galleryTitle")}</h2>
              <p className="ch-line ch-soft">{t("home.gallerySub")}</p>
            </div>
          </div>
          <div className="chapter center" data-a="0.84" data-b="1.01">
            <div className="holder">
              <p className="ch-eyebrow">{t("home.ctaEyebrow")}</p>
              <h2 className="ch-title">{t("home.ctaTitle")}</h2>
              <Link className="btn btn-primary ch-cta" href="/contact"><span>{t("home.ctaBtn")}</span> →</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="stage-hint" ref={hintRef}>
        <span>{t("home.scroll")}</span>
        <span className="bar" />
      </div>
    </>
  );
}
