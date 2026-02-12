import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

interface ServiceFeatureListProps {
    features: string[];
    className?: string;
}

export function ServiceFeatureList({ features, className = "" }: ServiceFeatureListProps) {
    return (
        <ul className={`space-y-3 ${className}`}>
            {features.map((feature, i) => (
                <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-start gap-3"
                >
                    <CheckCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-base leading-relaxed">{feature}</span>
                </motion.li>
            ))}
        </ul>
    );
}
