"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Download, MapPin, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const skills = [
	{
		category: "Programming Languages",
		items: ["Python", "C++", "Java", "Go", "C", "Ruby on Rails"],
	},
	{
		category: "Frameworks & Libraries",
		items: ["Node.js", "Spring Boot", "Laravel", "Django", "React Native"],
	},
	{ category: "Databases", items: ["MySQL", "MongoDB"] },
	{ category: "Tools & Platforms", items: ["Git", "Docker", "AWS"] },
]

const experiences = [
	{
		company: "The Synergates Business Solutions",
		role: "Backend Engineer",
		period: "Jun 2024 - Aug 2024",
		achievements: [
			"Engineered scalable backend systems using Laravel MVC for government-level website",
			"Reduced loading times by 15% through server performance optimization",
			"Developed APIs and database schema for Markea App (React Native wedding hall search platform)",
			"Enhanced AI-powered Breast Cancer Club App backend integration",
			"Integrated OpenCV with .NET framework for Sindh Smart Surveillance System",
		],
	},
	{
		company: "10Pearls Pakistan",
		role: "SWE Intern",
		period: "Jun 2024 - Jul 2024",
		achievements: [
			"Built full stack CRUD application using MySQL, Java Spring Boot, React, and Tailwind CSS",
			"Reduced software bugs by 30% through comprehensive testing with JUnit and Selenium",
			"Improved user interface consistency and API reliability",
		],
	},
	{
		company: "Netsol Pakistan",
		role: "SWE Internship",
		period: "May 2023 - Aug 2023",
		achievements: [
			"Developed Python scripts using Flask to automate testing of Flex calculation engine",
			"Assisted in integrating new calculation modules into Flex API",
			"Contributed to faster processing times and improved scalability",
		],
	},
	{
		company: "GERRY'S INFORMATION TECHNOLOGY",
		role: "Internship",
		period: "Jul 2023 – Sep 2023",
		achievements: [
			"Optimized website performance by implementing transitioning hooks, achieving a 30% reduction in page load times.",
			"Designed responsive web interfaces, leading to a 40% increase in mobile traffic and a 25% boost in user engagement.",
			"Collaborated with cross-functional teams to develop scalable front-end solutions for aviation companies and FedEx.",
		],
	},
]

export default function About() {
	return (
		<div className="min-h-screen pt-16">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-center mb-16"
				>
					<h1 className="text-4xl sm:text-5xl font-bold mb-6">About Me</h1>
					<p className="text-xl text-muted-foreground max-w-3xl mx-auto">
						Passionate about building innovative solutions that bridge technology
						and real-world impact
					</p>
				</motion.div>

				{/* Bio Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20"
				>
					<div>
						<h2 className="text-3xl font-bold mb-6">My Story</h2>
						<div className="space-y-4 text-muted-foreground">
							<p>
								I'm a Software Engineer with hands-on experience building scalable
								backend systems, secure APIs, and AI-integrated solutions.
								Currently pursuing my BSc in Computer Science at Lahore University
								of Management Sciences (LUMS).
							</p>
							<p>
								My expertise spans across multiple technologies including Laravel,
								Spring Boot, and React, with a strong focus on system optimization,
								cross-functional teamwork, and deploying full-stack applications
								across real-world platforms.
							</p>
							<p>
								I'm particularly passionate about machine learning and AI, having
								developed diagnostic tools and classification systems that achieve
								state-of-the-art performance. My goal is to create technology that
								makes a meaningful difference in people's lives.
							</p>
						</div>

						<div className="mt-8 flex flex-col sm:flex-row gap-4">
							<Button asChild>
								<Link href="/resume.pdf" target="_blank">
									<Download className="mr-2 h-4 w-4" />
									Download Resume
								</Link>
							</Button>
							<Button variant="outline" asChild>
								<Link href="/contact">Get In Touch</Link>
							</Button>
						</div>
					</div>

					<div className="space-y-6">
						<Card>
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">Contact Information</h3>
								<div className="space-y-3">
									<div className="flex items-center gap-3">
										<MapPin className="h-4 w-4 text-muted-foreground" />
										<span>Karachi, Pakistan</span>
									</div>
									<div className="flex items-center gap-3">
										<Phone className="h-4 w-4 text-muted-foreground" />
										<span>+92-309-3300668</span>
									</div>
									<div className="flex items-center gap-3">
										<Mail className="h-4 w-4 text-muted-foreground" />
										<span>mustufashadab123@gmail.com</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4">Education</h3>
								<div>
									<h4 className="font-medium">
										Lahore University of Management Sciences (LUMS)
									</h4>
									<p className="text-sm text-muted-foreground">
										BSc, Computer Science • GPA: 3.70 • Jun 2026
									</p>
									<p className="text-sm text-muted-foreground mt-2">
										Coursework: OOP, Data Structures, AI, Machine Learning, Deep
										Learning, Computer Vision, Software Engineering, Distributed
										Systems
									</p>
								</div>
							</CardContent>
						</Card>
					</div>
				</motion.div>

				{/* Skills Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
					className="mb-20"
				>
					<h2 className="text-3xl font-bold text-center mb-12">
						Technical Skills
					</h2>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{skills.map((skillGroup, index) => (
							<motion.div
								key={skillGroup.category}
								initial={{ opacity: 0, y: 20 }}
								whileInView={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card className="h-full">
									<CardContent className="p-6">
										<h3 className="font-semibold mb-4">{skillGroup.category}</h3>
										<div className="space-y-2">
											{skillGroup.items.map((skill) => (
												<span
													key={skill}
													className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm mr-2 mb-2"
												>
													{skill}
												</span>
											))}
										</div>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>

				{/* Experience Section */}
				<motion.div
					initial={{ opacity: 0, y: 30 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					viewport={{ once: true }}
				>
					<h2 className="text-3xl font-bold text-center mb-12">Experience</h2>
					<div className="space-y-8">
						{experiences.map((exp, index) => (
							<motion.div
								key={exp.company}
								initial={{ opacity: 0, x: -30 }}
								whileInView={{ opacity: 1, x: 0 }}
								transition={{ duration: 0.5, delay: index * 0.1 }}
								viewport={{ once: true }}
							>
								<Card>
									<CardContent className="p-6">
										<div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
											<div>
												<h3 className="text-xl font-semibold">{exp.role}</h3>
												<p className="text-primary font-medium">
													{exp.company}
												</p>
											</div>
											<span className="text-sm text-muted-foreground">
												{exp.period}
											</span>
										</div>
										<ul className="space-y-2">
											{exp.achievements.map((achievement, i) => (
												<li
													key={i}
													className="text-muted-foreground flex items-start"
												>
													<span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0" />
													{achievement}
												</li>
											))}
										</ul>
									</CardContent>
								</Card>
							</motion.div>
						))}
					</div>
				</motion.div>
			</div>
		</div>
	)
}
