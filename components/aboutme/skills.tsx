"use client"

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
        <div >
            {Skills.map((item : {name : string, icon : string, technology : string[]}, index: number) => (
                <div key={index} className="container flex md:flex-row flex-col md:flex-rowjustify-between mb-4 md:px-8 pb-4">
                    <div className='w-full md:w-1/4'>
                        <p className='text-black w-full text-sm'>{item.name}</p>
                    </div>
                    <div className="w-full md:w-3/4 flex gap-4 flex-wrap">
                        {item.technology.map((skill, index) => (
                        <div key={index} className="p-2 mb-2 bg-[#eee] rounded-md shadow-sm text-sm hover:bg-gray-100">
                            {skill}
                        </div>  
                        ))}                      
                    </div>
                </div> 
            ))} 
        </div>
    );
}
