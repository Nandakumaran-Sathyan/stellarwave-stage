import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { InstagramIcon, LinkedinIcon, MailIcon } from 'lucide-react';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const socialLinks = [
	{ title: 'LinkedIn', href: 'https://www.linkedin.com/company/stellar-wave/', icon: LinkedinIcon },
	{ title: 'Instagram', href: 'https://www.instagram.com/stellarwave_marketing/', icon: InstagramIcon },
	{ title: 'Email', href: 'mailto:info@stellarwave.in', icon: MailIcon },
];

export function Footer() {
	return (
		<footer className="md:rounded-t-6xl relative w-full max-w-6xl mx-auto rounded-t-4xl border-t border-black/10 dark:border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.black/5%),transparent)] dark:bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)] px-6 py-12 lg:py-16">
			<div className="bg-foreground/20 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="flex flex-col xl:flex-row items-center xl:items-end justify-between gap-10">

				{/* Left — logo + copyright */}
				<AnimatedContainer className="flex flex-col gap-4 items-center xl:items-start">
					<img
						src="/assets/logo-2.png"
						alt="Stellar Wave Logo"
						className="h-8 w-auto object-contain invert dark:invert-0"
					/>
					<p className="text-muted-foreground text-sm text-center xl:text-left">
						© {new Date().getFullYear()} Stellar Wave.<br className="hidden xl:block" /> All rights reserved.
					</p>
				</AnimatedContainer>

				{/* Centre — big gradient brand name */}
				<AnimatedContainer delay={0.15} className="flex-1 flex flex-col items-center justify-center gap-4">
					<span
						className="font-black uppercase tracking-tighter leading-none text-center select-none
						text-transparent bg-clip-text
						bg-gradient-to-r from-purple-500 via-fuchsia-400 to-indigo-500
						dark:from-purple-300 dark:via-fuchsia-200 dark:to-indigo-300"
						style={{ fontSize: 'clamp(2rem, 6vw, 5rem)' }}
					>
						STELLARWAVE.IN
					</span>
					{/* NAP block for Local SEO */}
					<address className="not-italic text-center text-xs text-black/40 dark:text-white/40 leading-relaxed">
						<strong className="block text-black/60 dark:text-white/60 text-sm not-italic">Digital Marketing Agency in Chennai</strong>
						10th Floor, Gee Gee Crystals, 91, Dr Radha Krishnan Salai,<br />
						Mylapore, Chennai, Tamil Nadu 600004<br />
						<a href="tel:+918124179141" className="hover:text-black dark:hover:text-white transition-colors">+91 81241 79141</a>
						{' · '}
						<a href="mailto:info@stellarwave.in" className="hover:text-black dark:hover:text-white transition-colors">info@stellarwave.in</a>
					</address>
				</AnimatedContainer>

				{/* Right — social links */}
				<AnimatedContainer delay={0.25} className="flex flex-col items-center xl:items-end gap-3">
					<h3 className="text-xs font-semibold uppercase tracking-widest text-black/50 dark:text-white/50">
						Connect
					</h3>
					<ul className="flex flex-col items-center xl:items-end gap-2">
						{socialLinks.map((link) => (
							<li key={link.title}>
								<a
									href={link.href}
									target={link.href.startsWith('http') ? '_blank' : undefined}
									rel="noreferrer"
									className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-black dark:hover:text-white transition-colors duration-300"
								>
									{link.icon && <link.icon className="size-4" />}
									{link.title}
								</a>
							</li>
						))}
					</ul>
				</AnimatedContainer>

			</div>
		</footer>
	);
}

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
} & ComponentProps<'div'>;

function AnimatedContainer({ className, delay = 0.1, children, ...props }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
			{...props}
		>
			{children}
		</motion.div>
	);
}
