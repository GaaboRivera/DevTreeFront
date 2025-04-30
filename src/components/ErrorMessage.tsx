type ErrorMessageProps = {
	children: React.ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
	return <p className="text-sm text-red-600">{children}</p>;
}
