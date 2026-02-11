import { useTranslation } from 'react-i18next';
import { BookOpen, Target, Lightbulb, Users } from 'lucide-react';

const About = () => {
    useTranslation();

    const objectives = [
        "Develop innovative on-the-job learning methodologies tailored for industrial reskilling",
        "Create AI-based tools to support personalised learning pathways in workplace environments",
        "Foster cooperation between VET providers and industrial partners across Europe",
        "Produce open educational resources for industrial reskilling accessible to a wide audience",
        "Contribute to European policy dialogue on vocational education and training modernisation"
    ];

    const focusAreas = [
        "Vocational Education and Training (VET)",
        "On-the-job learning methodologies",
        "Industrial reskilling and upskilling",
        "AI-based learning support tools"
    ];

    const targetGroups = [
        "Industrial workers undergoing reskilling processes",
        "VET providers and trainers in industrial sectors",
        "HR managers and training coordinators in industry",
        "Policy makers in vocational education and employment"
    ];

    return (
        <div className="py-16 md:py-24 bg-white">
            <div className="max-w-4xl mx-auto px-6">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-primary text-center mb-16 tracking-tight">
                    About the Project
                </h1>

                <div className="space-y-20">
                    {/* Background & Context */}
                    <section>
                        <div className="flex items-center gap-3 mb-6">
                            <BookOpen className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">Background & Context</h2>
                        </div>
                        <p className="text-slate-500 text-base md:text-[17px] leading-relaxed">
                            The rapid evolution of industrial processes, driven by digitalisation and automation, is creating a growing need for workforce reskilling across Europe. Traditional training approaches often fail to address the specific, contextual learning needs of workers who must adapt to new technologies and processes while remaining productive. Learning Brains addresses this challenge by developing integrated on-the-job learning systems that combine practical workplace experience with structured educational approaches.
                        </p>
                    </section>

                    {/* Project Objectives */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Target className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">Project Objectives</h2>
                        </div>
                        <div className="space-y-3">
                            {objectives.map((obj, idx) => (
                                <div key={idx} className="flex items-center gap-4 p-4 bg-slate-50/80 rounded-lg group transition-colors hover:bg-slate-100">
                                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-secondary text-white flex items-center justify-center text-[10px] font-bold">
                                        {idx + 1}
                                    </div>
                                    <p className="text-slate-600 text-sm md:text-base">{obj}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Focus Areas */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Lightbulb className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">Focus Areas</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {focusAreas.map((area, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-xl shadow-sm text-slate-600 text-[15px] font-medium bg-white">
                                    {area}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Target Groups */}
                    <section>
                        <div className="flex items-center gap-3 mb-8">
                            <Users className="w-6 h-6 text-brand-secondary" />
                            <h2 className="text-xl md:text-2xl font-bold text-brand-primary">Target Groups</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {targetGroups.map((group, idx) => (
                                <div key={idx} className="p-5 border border-slate-100 rounded-xl shadow-sm text-slate-600 text-[15px] font-medium bg-white">
                                    {group}
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
