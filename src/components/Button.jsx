import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-6 py-3 rounded-full font-bold transition-all duration-300 flex items-center gap-2";

    const variants = {
        primary: "bg-gradient-to-r from-accent to-orange-500 text-white hover:shadow-lg hover:scale-105",
        outline: "border-2 border-current hover:bg-white/10",
        white: "bg-white text-primary hover:bg-gray-100"
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
};

export default Button;
