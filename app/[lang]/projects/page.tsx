import { generatePageMetadata } from "@/lib/metadata";
import { ProjectsClient } from "@/components/ProjectsClient";

export const metadata = generatePageMetadata({
  title: "Our Projects",
  path: "/projects",
  description:
    "A showcase of our craftsmanship — from Islamic calligraphy and marble inlay to hand-carved sculpture, masjid work and luxury home décor.",
});

export default function ProjectsPage() {
  return <ProjectsClient />;
}
