interface HeaderProps {
    title: string;
    secondLine?: string;
    subtitle: string;
}

function Header({ title, secondLine = '', subtitle }: HeaderProps) {
    return (
        <div className="text-white text-left">
            <div className="text-3xl mb-5 text-3d">{title}<br />{secondLine}</div>
            <div className="text-xl">{subtitle}</div>
        </div>
    );
};

export default Header;
