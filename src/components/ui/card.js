export const Card = ({ children }) => <div className='border rounded shadow p-2'>{children}</div>;
export const CardContent = ({ children, className }) => <div className={className}>{children}</div>;