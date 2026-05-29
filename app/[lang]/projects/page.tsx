import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { isLang } from "@/lib/locale";
import type { Lang } from "@/lib/dict";
import { ProjectsClient } from "@/components/ProjectsClient";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang: Lang = isLang(raw) ? raw : "en";
  return generatePageMetadata({
    lang,
    title: "Our Projects",
    path: "/projects",
    description:
      "A showcase of our craftsmanship — from Islamic calligraphy and marble inlay to hand-carved sculpture, masjid work and luxury home décor.",
  });
}

export default function ProjectsPage() {
  return <ProjectsClient />;
}
