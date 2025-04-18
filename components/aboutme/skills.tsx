"use client"

import * as Icons from 'lucide-react';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"


// need to put in cms
const Skills = [
    {
        name : "FrontEnd", 
        icon: "Monitor", 
        technology: [ 
            "React",
            "Next.js",
            "JavaScript",
            "TypeScript",
            "HTML",
            "CSS",
            "Tailwind CSS",
            "Shadcn/ui",
        ] 
    },
    {
        name : "BackEnd", 
        icon: "Database", 
        technology: [ 
            "Node.js",
            "Express",
            "GraphQL",
            "RESTful APIs",
            "PostgreSQL",
        ] 
    },
    {
        name : "DevOps", 
        icon: "Workflow", 
        technology: [ 
            "AWS",
            "Docker",
            "CI/CD",
            "Git",
            "GitHub Actions",
        ] 
    },
    {
        name : "Testing", 
        icon: "TabletSmartphone", 
        technology: [ 
            "Selenium",
            "Cypress",
        ] 
    },
];


export default function ProjectCard() {
    return (
        <div className="grid md:grid-cols-2 gap-10 items-center">
            {Skills.map((item : {name : string, icon : string, technology : string[]}, index: number) => (
                <div key={index} className="h-full">
                    <Card className="h-full rounded-none">
                    <CardHeader>
                        <CardTitle>
                            {(() => {
                                const iconName = item.icon; // Use the icon from the item
                                const LucideIcon = Icons[iconName as keyof typeof Icons] as React.ElementType;
                                return LucideIcon ? <LucideIcon className="w-8 h-8" /> : null;
                            })()}
                        </CardTitle>
                        <CardDescription className="flex gap-2 items-center">
                            <h3 className='text-black'>{item.name}</h3>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                    
                    {item.technology.map((skill, index) => (
                        
                        <div key={index} className="p-2 rounded-md bg-[#f2f2f2] text-sm font-medium transition-transform duration-300 hover:scale-105 ">
                            {skill}
                          
                        </div>  
                    ))}
                    </CardContent>
                </Card>
                </div>
            ))} 
        </div>
    );
}
