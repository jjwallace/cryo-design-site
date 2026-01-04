import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-wide uppercase transition-all duration-300';

  const variants = {
    primary: 'bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200',
    secondary: 'bg-transparent text-black dark:text-white border border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black',
    ghost: 'bg-transparent text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400',
  };

  const sizes = {
    sm: 'px-3 py-2 text-xs sm:px-4',
    md: 'px-4 py-2.5 text-xs sm:px-6 sm:py-3 sm:text-sm',
    lg: 'px-6 py-3 text-sm sm:px-8 sm:py-4 sm:text-base',
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={styles} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={styles} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  );
}
