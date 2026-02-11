"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink, Github, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import "./highlight.css"
import { projects } from "@/lib/projects-data"

const categories = ["All", "Analytics", "AI/ML", "Research", "Education", "Healthcare", "E-commerce", "Travel", "Agriculture", "Tourism"]

export default function Projects() {
	const [selectedCategory, setSelectedCategory] = useState("All")
	const [searchTerm, setSearchTerm] = useState("")
	const { scrollYProgress } = useScroll()
	const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])

	// Handle URL query parameters for direct project navigation
	useEffect(() => {
		// Check if we have a project name in the URL
		const queryParams = new URLSearchParams(window.location.search);
		const projectParam = queryParams.get('project');
		
		if (projectParam) {
			// Find the project by partial name match
			const matchedProject = projects.find(project => 
				project.title.toLowerCase().includes(projectParam.toLowerCase())
			);
			
			if (matchedProject) {
				// Clear the URL parameter without reloading the page
				window.history.replaceState({}, '', '/projects');
				
				// Set filter to match this project's category and scroll to it
				setSelectedCategory(matchedProject.category);
				
				// Add a small delay to ensure state updates before scrolling
				setTimeout(() => {
					const projectElement = document.getElementById(`project-${matchedProject.title.replace(/\s+/g, '-').toLowerCase()}`);
					if (projectElement) {
						// Scroll with offset to account for fixed header
						const headerOffset = 100;
						const elementPosition = projectElement.getBoundingClientRect().top;
						const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
						
						// Scroll to the element position
						window.scrollTo({
							top: offsetPosition,
							behavior: "smooth"
						});
						
						// Add highlighting effect
						projectElement.classList.add('highlight-project');
						
						// Remove the highlight class after animation completes
						setTimeout(() => {
							projectElement.classList.remove('highlight-project');
							
							// Add a subtle persistent highlight
							projectElement.style.boxShadow = '0 0 10px rgba(79, 70, 229, 0.3)';
							setTimeout(() => {
								projectElement.style.transition = 'box-shadow 0.5s ease';
								projectElement.style.boxShadow = 'none';
							}, 3000);
						}, 2000);
					}
				}, 800);
			}
		}
	}, []);

	const filteredProjects = projects.filter((project) => {
		const matchesCategory = selectedCategory === "All" || project.category === selectedCategory
		const matchesSearch =
			project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			project.technologies.some((tech) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
		return matchesCategory && matchesSearch
	})

	return (
		<div className="min-h-screen pt-16">
			{/* Hero Section */}
			<section className="relative py-20 overflow-hidden">
				<motion.div style={{ y }} className="absolute inset-0">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
					<div className="absolute inset-0 grid-pattern opacity-20" />
				</motion.div>

				<div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						className="text-center mb-16"
					>
						<motion.div
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							className="mb-6"
						>
							{/* <Badge variant="outline" className="px-4 py-2 text-sm font-medium">
                🚀 My Work
              </Badge> */}
						</motion.div>

						<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
							<span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
								Featured Projects
							</span>
						</h1>
						<p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
							A collection of projects showcasing my expertise in web development, machine learning, and AI integration
						</p>
					</motion.div>

					{/* Search and Filter */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6, delay: 0.4 }}
						className="flex flex-col md:flex-row gap-4 mb-12"
					>
						<div className="relative flex-1">
							<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
							<Input
								placeholder="Search projects, technologies..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="pl-10"
							/>
						</div>

						<div className="flex flex-wrap gap-2">
							{categories.map((category) => (
								<Button
									key={category}
									variant={selectedCategory === category ? "default" : "outline"}
									size="sm"
									onClick={() => setSelectedCategory(category)}
									className="transition-all duration-200"
								>
									<Filter className="h-3 w-3 mr-1" />
									{category}
								</Button>
							))}
						</div>
					</motion.div>
				</div>
			</section>

			{/* Projects Grid */}
			<section className="pb-20">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					{/* Featured Projects */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
						className="mb-16"
					>
						<h2 className="text-3xl font-bold mb-8 mt-8 text-center">Featured Projects</h2>
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
							{filteredProjects
								.filter((project) => project.featured)
								.map((project, index) => (
									<motion.div
										id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
										key={project.title}
										initial={{ opacity: 0, y: 20 }}
										whileInView={{ opacity: 1, y: 0 }}
										transition={{ duration: 0.5, delay: index * 0.1 }}
										viewport={{ once: true }}
										whileHover={{ y: -8 }}
										className="group"
									>
										<Card className="h-full overflow-hidden transition-all duration-500 hover:shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
											<div className="relative overflow-hidden">
												<Image
													src={project.image || "/placeholder.svg"}
													alt={project.title}
													width={500}
													height={300}
													className="w-full h-48 object-cover transition-all duration-500 group-hover:scale-110"
												/>
												<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
												<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
													<div className="flex space-x-4">
														{project.liveUrl && (
															<Button size="sm" asChild className="bg-white text-black hover:bg-gray-100">
																<Link href={project.liveUrl} target="_blank">
																	<ExternalLink className="h-4 w-4 mr-2" />
																	Live Demo
																</Link>
															</Button>
														)}
														{project.githubUrl && (
															<Button
																size="sm"
																variant="outline"
																asChild
																className="border-white text-white hover:bg-white hover:text-black"
															>
																<Link href={project.githubUrl} target="_blank">
																	<Github className="h-4 w-4 mr-2" />
																	Code
																</Link>
															</Button>
														)}
													</div>
												</div>
												<div className="absolute top-4 right-4">
													{/* <Badge variant="secondary" className="bg-white/90 text-black">
                            {project.year}
                          </Badge> */}
												</div>
											</div>

											<CardHeader className="pb-3">
												<div className="flex items-center justify-between mb-2">
													<Badge variant="outline" className="text-xs">
														{project.category}
													</Badge>
												</div>
												<CardTitle className="group-hover:text-primary transition-colors text-xl">
													{project.title}
												</CardTitle>
												<CardDescription className="text-sm leading-relaxed">{project.description}</CardDescription>
											</CardHeader>

											<CardContent>
												<div className="flex flex-wrap gap-2">
													{project.technologies.slice(0, 4).map((tech) => (
														<Badge key={tech} variant="secondary" className="text-xs">
															{tech}
														</Badge>
													))}
													{project.technologies.length > 4 && (
														<Badge variant="secondary" className="text-xs">
															+{project.technologies.length - 4} more
														</Badge>
													)}
												</div>
											</CardContent>
										</Card>
									</motion.div>
								))}
						</div>
					</motion.div>

					{/* All Projects */}
					<motion.div
						initial={{ opacity: 0, y: 30 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.8 }}
						viewport={{ once: true }}
					>
						<h2 className="text-3xl font-bold mb-8 text-center">All Projects</h2>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
							{filteredProjects.map((project, index) => (
								<motion.div
									id={`project-${project.title.replace(/\s+/g, '-').toLowerCase()}`}
									key={project.title}
									initial={{ opacity: 0, y: 20 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: index * 0.1 }}
									viewport={{ once: true }}
									whileHover={{ y: -5, scale: 1.02 }}
									className="group"
								>
									<Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-xl">
										<div className="relative overflow-hidden">
											<Image
												src={project.image || "/placeholder.svg"}
												alt={project.title}
												width={400}
												height={200}
												className="w-full h-32 object-cover transition-transform duration-300 group-hover:scale-105"
											/>
											<div className="absolute top-2 right-2">
												<Badge variant="secondary" className="text-xs">
													{project.category}
												</Badge>
											</div>
										</div>

										<CardHeader className="pb-2">
											<CardTitle className="text-lg group-hover:text-primary transition-colors">
												{project.title}
											</CardTitle>
											<CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
										</CardHeader>

										<CardContent className="space-y-4">
											<div className="flex flex-wrap gap-1">
												{project.technologies.slice(0, 3).map((tech) => (
													<Badge key={tech} variant="outline" className="text-xs">
														{tech}
													</Badge>
												))}
												{project.technologies.length > 3 && (
													<Badge variant="outline" className="text-xs">
														+{project.technologies.length - 3}
													</Badge>
												)}
											</div>

											<div className="flex space-x-2">
												{project.liveUrl && (
													<Button size="sm" variant="outline" asChild className="flex-1">
														<Link href={project.liveUrl} target="_blank">
															<ExternalLink className="h-3 w-3 mr-1" />
															Live
														</Link>
													</Button>
												)}
												{project.githubUrl && (
													<Button size="sm" variant="outline" asChild className="flex-1">
														<Link href={project.githubUrl} target="_blank">
															<Github className="h-3 w-3 mr-1" />
															Code
														</Link>
													</Button>
												)}
											</div>
										</CardContent>
									</Card>
								</motion.div>
							))}
						</div>

						{filteredProjects.length === 0 && (
							<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
								<p className="text-muted-foreground text-lg">No projects found matching your criteria.</p>
								<Button
									variant="outline"
									onClick={() => {
										setSelectedCategory("All")
										setSearchTerm("")
									}}
									className="mt-4"
								>
									Clear Filters
								</Button>
							</motion.div>
						)}
					</motion.div>
				</div>
			</section>
		</div>
	)
}
