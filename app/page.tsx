"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Download, Github, Linkedin, Mail, Rocket, ExternalLink } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TechSlider } from "@/components/ui/tech-slider"
import { useEffect, useState } from "react"
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import Image from "next/image"
import { cn } from "@/lib/utils"

// (Technologies and achievements data removed because unused)

const projects = [
	{
		title: "Auto-Analytics Platform (ContinuumAI)",
		description:
			"Agentic analytics platform with validated text-to-SQL aggregations, charting, and a RAG-backed chatbot for business data.",
		image: "/continuumai.png",
		technologies: ["Next.js", "Python", "Redis"],
		liveUrl: "https://www.youtube.com/watch?v=T_hFb3U4KF0",
		githubUrl: "",
		featured: true,
	},
	{
		title: "Karachi City Guide",
		description:
			"Tourism portal featuring interactive maps, event listings, and comprehensive guide content for Karachi.",
		image: "/khi_pic.png",
		technologies: ["React", "Interactive Maps", "Tourism"],
		liveUrl: "https://www.click.gos.pk/",
		githubUrl: "",
		featured: true,
	},
	{
		title: "Serene Airlines Website",
		description:
			"Professional airline booking UI with dynamic search widget, booking flow, and responsive design.",
		image: "/serene_pic.png",
		technologies: ["React", "UI/UX", "Booking System"],
		liveUrl: "https://sereneair.com/",
		githubUrl: "",
		featured: true,
	},
]

export default function Home() {
	const { scrollYProgress } = useScroll()
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

	// --- Featured Projects 3D Carousel Section ---
	const featuredProjects = projects.filter((p) => p.featured)
	const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null)
	const [selected, setSelected] = useState(1) // Start with middle item (index 1 for 3 items)
	const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
	const [isMobileView, setIsMobileView] = useState(false)

	// Add responsive check for mobile/desktop view
	useEffect(() => {
		const checkScreenSize = () => {
			setIsMobileView(window.innerWidth < 1024)
		}
		
		// Initial check
		checkScreenSize()
		
		// Add event listener for resize
		window.addEventListener('resize', checkScreenSize)
		
		// Cleanup
		return () => {
			window.removeEventListener('resize', checkScreenSize)
		}
	}, [])

	useEffect(() => {
		if (!carouselApi) return
		
		const onSelect = () => {
			setSelected(carouselApi.selectedScrollSnap())
		}
		
		const onReInit = () => {
			setScrollSnaps(carouselApi.scrollSnapList())
			setSelected(carouselApi.selectedScrollSnap())
		}
		
		// Set up event listeners
		carouselApi.on("select", onSelect)
		carouselApi.on("reInit", onReInit)
		
		// Initialize
		setScrollSnaps(carouselApi.scrollSnapList())
		
		// Set initial position to middle item
		const middleIndex = Math.floor(featuredProjects.length / 2)
		carouselApi.scrollTo(middleIndex, true)
		setSelected(middleIndex)
		
		return () => {
			carouselApi.off("select", onSelect)
			carouselApi.off("reInit", onReInit)
		}
	}, [carouselApi, featuredProjects.length])

	return (
		<div className="min-h-screen">
			{/* Hero Section */}
			<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
				{/* Animated Background */}
				<motion.div style={{ y, opacity }} className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
					<div className="absolute inset-0 grid-pattern opacity-30" />
				</motion.div>

				{/* Floating Elements */}
				<div className="absolute inset-0 overflow-hidden pointer-events-none">
					<motion.div
						animate={{
							x: [0, 100, 0],
							y: [0, -100, 0],
							rotate: [0, 180, 360],
						}}
						transition={{
							duration: 20,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
						className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
					/>
					<motion.div
						animate={{
							x: [0, -100, 0],
							y: [0, 100, 0],
							rotate: [360, 180, 0],
						}}
						transition={{
							duration: 25,
							repeat: Number.POSITIVE_INFINITY,
							ease: "linear",
						}}
						className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl"
					/>
				</div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						{/* Greeting */}

						<h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6">
							<span className="block"></span>
							<motion.span
								className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.8, delay: 0.4 }}
							>
								Muhammad Mustafa
							</motion.span>
						</h1>

						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.6 }}
							className="mb-8"
						>
							<h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground font-light">
								Software Engineer & ML Enthusiast
							</h2>
						</motion.div>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 0.8 }}
							className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed"
						>
							Building scalable backend systems, secure APIs, and AI-integrated solutions. Passionate about creating
							innovative technology that makes a difference.
						</motion.p>

						{/* CTA Buttons */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1 }}
							className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
						>
							<Button
								asChild
								size="lg"
								className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
							>
								<Link href="/projects">
									<Rocket className="mr-2 h-4 w-4" />
									View My Projects
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>

							<Button asChild variant="outline" size="lg" className="group">
								<Link href="/resume.pdf" target="_blank">
									<Download className="mr-2 h-4 w-4 transition-transform group-hover:scale-110" />
									Download Resume
								</Link>
							</Button>
						</motion.div>

						{/* Social Links */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8, delay: 1.2 }}
							className="flex justify-center space-x-6"
						>
							{[
								{ icon: Mail, href: "mailto:mustufashadab123@gmail.com", label: "Email" },
								{ icon: Github, href: "https://github.com/Negatrin", label: "GitHub" },
								{ icon: Linkedin, href: "https://www.linkedin.com/in/muhammad-mustufa-02a108230/", label: "LinkedIn" },
							].map((social, index) => (
								<motion.div
									key={social.label}
									whileHover={{ scale: 1.1, y: -2 }}
									whileTap={{ scale: 0.95 }}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 1.4 + index * 0.1 }}
								>
									<Button variant="ghost" size="icon" asChild className="w-12 h-12 rounded-full">
										<Link href={social.href} target="_blank" aria-label={social.label}>
											<social.icon className="h-5 w-5" />
										</Link>
									</Button>
								</motion.div>
							))}
						</motion.div>
					</motion.div>
				</div>

				{/* Scroll Indicator */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ delay: 2 }}
					className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
				>
					<motion.div
						animate={{ y: [0, 10, 0] }}
						transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
						className="w-6 h-10 border-2 border-muted-foreground rounded-full flex justify-center"
					>
						<motion.div
							animate={{ y: [0, 12, 0] }}
							transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
							className="w-1 h-3 bg-muted-foreground rounded-full mt-2"
						/>
					</motion.div>
				</motion.div>
			</section>

			{/* Technologies Section */}
			<section className="w-full py-20">
				<div className="max-w-6xl mx-auto px-8 py-12 text-center">
					<h3 className="text-2xl font-bold mb-4">Technologies I Work With</h3>
					<p className="text-muted-foreground">Building with modern tools and frameworks</p>
				</div>
				<TechSlider />
			</section>

			{/* Achievements Section
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-16"
					>
						<h3 className="text-3xl font-bold mb-4">Key Achievements</h3>
						<p className="text-muted-foreground text-lg">Highlights from my journey</p>
					</motion.div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{achievements.map((achievement, index) => (
							<motion.div
								key={achievement.label}
								initial={{ opacity: 0, y: 30 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: index * 0.1 }}
								viewport={{ once: true }}
								whileHover={{ y: -5 }}
							>
								<Card className="text-center p-6 h-full hover:shadow-lg transition-all duration-300">
									<CardContent className="space-y-4">
										<div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mx-auto">
											<achievement.icon className="h-6 w-6 text-white" />
										</div>
										<h4 className="text-xl font-bold">{achievement.label}</h4>
										<p className="text-muted-foreground text-sm">{achievement.description}</p>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</div>
			</section> */}

			{/* CTA Section */}
			{/*
			<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-white"
					>
						<h3 className="text-3xl font-bold mb-4">Let's Build Something Amazing Together</h3>
						<p className="text-xl mb-8 opacity-90">Ready to bring your ideas to life with cutting-edge technology?</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg" variant="secondary" className="group">
								<Link href="/contact">
									Get In Touch
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button
								asChild
								size="lg"
								variant="outline"
								className="border-white text-white hover:bg-white hover:text-blue-600"
							>
								<Link href="/projects">View My Work</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>
			*/}

			{/* Work Experience Section */}
			<section className="py-20 bg-muted/30">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h3 className="text-2xl font-bold mb-4">Work Experience</h3>
						<p className="text-muted-foreground">A quick look at my professional journey</p>
					</motion.div>
					<div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-8">
						{/* Card with blue gradient shadow */}
						<div className="relative">
							{/* Permanent gradient shadow box */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-blue-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]"></div>
							<Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
								<CardContent className="p-6">
									<h4 className="text-lg font-bold mb-1">Backend Engineer</h4>
									<p className="text-muted-foreground mb-1">The Synergates Business Solutions</p>
									<p className="text-xs mb-2">Jun 2024 - Aug 2024</p>
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										<li>Engineered scalable Laravel backend for a government portal</li>
										<li>Optimized server performance (15% faster load times)</li>
										<li>Developed APIs for Markea (wedding hall search) & AI-powered health apps</li>
									</ul>
								</CardContent>
							</Card>
						</div>
						
						{/* Card with purple gradient shadow */}
						<div className="relative">
							{/* Permanent gradient shadow box */}
							<div className="absolute inset-0 bg-gradient-to-r from-purple-500/15 to-purple-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]"></div>
							<Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
								<CardContent className="p-6">
									<h4 className="text-lg font-bold mb-1">SWE Intern</h4>
									<p className="text-muted-foreground mb-1">10Pearls Pakistan</p>
									<p className="text-xs mb-2">Jun 2024 - Jul 2024</p>
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										<li>Built full-stack CRUD app (Spring Boot, React, MySQL)</li>
										<li>Reduced bugs by 30% with automated testing</li>
										<li>Improved user interface consistency and API reliability</li>
									</ul>
								</CardContent>
							</Card>
						</div>
						
						{/* Card with pink gradient shadow */}
						<div className="relative">
							{/* Permanent gradient shadow box */}
							<div className="absolute inset-0 bg-gradient-to-r from-pink-500/15 to-pink-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]"></div>
							<Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
								<CardContent className="p-6">
									<h4 className="text-lg font-bold mb-1">SWE Intern</h4>
									<p className="text-muted-foreground mb-1">GERRY&apos;S INFORMATION TECHNOLOGY</p>
									<p className="text-xs mb-2">Jul 2023 – Sep 2023</p>
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										<li>Optimized aviation & FedEx web apps (30% faster load, 40% more mobile traffic)</li>
										<li>Designed responsive UIs and collaborated on scalable front-end solutions</li>
									</ul>
								</CardContent>
							</Card>
						</div>
						
						{/* Card with blue gradient shadow (repeated) */}
						<div className="relative">
							{/* Permanent gradient shadow box */}
							<div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-blue-600/25 blur-md rounded-xl transform translate-y-1 scale-[0.98]"></div>
							<Card className="h-full relative bg-card/90 backdrop-blur-sm z-10">
								<CardContent className="p-6">
									<h4 className="text-lg font-bold mb-1">SWE Intern</h4>
									<p className="text-muted-foreground mb-1">Netsol Pakistan</p>
									<p className="text-xs mb-2">May 2023 - Aug 2023</p>
									<ul className="list-disc list-inside text-sm text-muted-foreground">
										<li>Automated Flex engine testing with Flask</li>
										<li>Improved API scalability for enterprise finance product</li>
										<li>Contributed to faster processing times and improved scalability</li>
									</ul>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Projects Slider Section */}
			<section className="w-full py-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-center mb-12"
					>
						<h3 className="text-2xl font-bold mb-4">Featured Projects</h3>
						<p className="text-muted-foreground">A glimpse of my best work</p>
					</motion.div>
					<div className="w-full flex flex-col items-center">
						<div className="w-full perspective-1000 relative">
							<Carousel 
								setApi={setCarouselApi}
								opts={{
									loop: true,
									align: "center",
									startIndex: Math.floor(featuredProjects.length / 2),
									dragFree: false,
									containScroll: isMobileView ? "trimSnaps" : "keepSnaps"
								}}
								className="relative w-full"
							>
								<CarouselContent className={cn(
									'flex items-center',
									isMobileView ? 'py-4 overflow-visible' : 'py-12'
								)}>
									{featuredProjects.map((project, idx) => (
										<CarouselItem 
											key={project.title} 
											className={cn(
												'px-2',
												isMobileView ? 'basis-[95vw] max-w-[95vw] min-w-0' : 'basis-full md:basis-1/2 lg:basis-[45%] xl:basis-[40%] 2xl:basis-[35%]'
											)}
										>
											<motion.div
												className="transform-gpu cursor-pointer"
												onClick={() => {
													if (carouselApi && idx !== selected) {
														const animated = true;
														carouselApi.scrollTo(idx, animated);
														setSelected(idx);
													}
												}}
												animate={{
													scale: idx === selected ? 1.05 : (isMobileView ? 0.95 : 0.85),
													rotateY: idx === selected ? 0 : (idx - selected) * (isMobileView ? 12 : 8),
													zIndex: idx === selected ? 10 : 1,
													filter: idx === selected ? "brightness(1)" : "brightness(0.85)",
													y: isMobileView ? 0 : (idx === selected ? -10 : 0)
												}}
												transition={{ 
													type: "tween", 
													duration: 0.4,
													ease: [0.4, 0, 0.2, 1] 
												}}
											>
												<Card className={cn(
													'overflow-hidden bg-card/80 backdrop-blur-sm flex flex-col h-full',
													isMobileView ? 'rounded-xl shadow-lg' : ''
												)}>
													<div className={cn(
														'relative w-full',
														isMobileView ? 'h-40' : 'h-48'
													)}>
														<Image
															src={project.image || "/placeholder.svg"}
															alt={project.title}
															fill
															sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 33vw"
															className="object-cover"
														/>
													</div>
													<CardContent className={cn(
														'p-4 flex flex-col flex-grow',
														isMobileView ? 'py-2 px-4' : ''
													)}>
														<h4 className="font-semibold text-lg mb-1">{project.title}</h4>
														<p className="text-sm text-muted-foreground line-clamp-3 mb-3 flex-grow">{project.description}</p>
														<div className="flex flex-wrap gap-1 mb-3">
															{project.technologies.slice(0, 3).map((tech) => (
																<Badge key={tech} variant="secondary" className="text-xs">
																	{tech}
																</Badge>
															))}
															{project.technologies.length > 3 && (
																<Badge variant="secondary" className="text-xs">
																	+{project.technologies.length - 3} more
																</Badge>
															)}
														</div>
														<div className="flex gap-2 mt-auto">
															{project.liveUrl && (
																<Button size="sm" asChild className="flex-1">
																	<Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">Live <ExternalLink className="ml-1 h-3 w-3" /></Link>
																</Button>
															)}
															{project.githubUrl && (
																<Button size="sm" variant="outline" asChild className="flex-1">
																	<Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">Code <Github className="ml-1 h-3 w-3" /></Link>
																</Button>
															)}
														</div>
													</CardContent>
												</Card>
											</motion.div>
										</CarouselItem>
									))}
								</CarouselContent>
								{/* On mobile, show swipe hint instead of arrows */}
								{isMobileView && (
									<div className="w-full flex justify-center mt-3 mb-2">
										<span className="text-muted-foreground text-sm">Swipe to see more projects →</span>
									</div>
								)}
								{/* Desktop arrows: absolute sides, only on desktop */}
								{!isMobileView && (
									<>
										<CarouselPrevious 
											className="pointer-events-auto absolute left-4 top-1/2 -translate-y-1/2 z-20 text-foreground bg-background hover:bg-primary/10" 
										/>
										<CarouselNext 
											className="pointer-events-auto absolute right-4 top-1/2 -translate-y-1/2 z-20 text-foreground bg-background hover:bg-primary/10" 
										/>
									</>
								)}
							</Carousel>
						</div>
						{/* Dot Indicators */}
						<div className="flex justify-center gap-2 mt-6">
							{scrollSnaps.map((_, index) => (
								<Button
									key={index}
									variant="outline"
									size="icon"
									className={cn(
										"h-2 w-2 rounded-full p-0 bg-transparent hover:bg-primary/20 border-primary/50",
										index === selected ? "bg-primary scale-125" : "bg-primary/30"
									)}
									onClick={() => {
										if (carouselApi) {
											carouselApi.scrollTo(index, true);
											setSelected(index);
										}
									}}
									aria-label={`Go to slide ${index + 1}`}
								/>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Let's Build Something Amazing Together CTA Section */}
			<section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
				<div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="text-white"
					>
						<h3 className="text-3xl font-bold mb-4">Let&apos;s Build Something Amazing Together</h3>
						<p className="text-xl mb-8 opacity-90">Ready to bring your ideas to life with cutting-edge technology?</p>
						<div className="flex flex-col sm:flex-row gap-4 justify-center">
							<Button asChild size="lg" variant="secondary" className="group">
								<Link href="/contact">
									Get In Touch
									<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</Button>
							<Button asChild size="lg" variant="secondary" className="group">
								<Link href="/projects">View My Work</Link>
							</Button>
						</div>
					</motion.div>
				</div>
			</section>

			{/* ...remaining content (if any)... */}
		</div>
	)
}