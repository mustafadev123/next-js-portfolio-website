import { CoreBackground } from "@/components/core3d/core-background"
import { CoreFigure } from "@/components/core/core-figure"
import { CubeIntro } from "@/components/intro/cube-intro"
import { ContactCta } from "@/components/home/contact-cta"
import { ExperienceTimeline } from "@/components/home/experience-timeline"
import { Hero } from "@/components/home/hero"
import { SelectedWork } from "@/components/home/selected-work"
import { Toolkit } from "@/components/home/toolkit"

export default function Home() {
	return (
		<div className="min-h-screen">
			<CubeIntro core={<CoreFigure gradientId="intro-core-shade" />} />
			<CoreBackground />
			{/* Content sits above the fixed 3D layer */}
			<div className="relative z-[1]">
				<Hero />
				<SelectedWork />
				<ExperienceTimeline />
				<Toolkit />
				<ContactCta />
			</div>
		</div>
	)
}
