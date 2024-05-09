import React from 'react';

interface HeaderProps {
    title: string;
    secondLine?: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, secondLine='', subtitle }) => {
    return (
        <div className="text-white text-left mt-10 mb-12">
            <div className="text-5xl font-blod mb-10">{title}<br/>{secondLine}</div>
            <div className="text-2xl">{subtitle}</div>
        </div>
    );
};

export default Header;
