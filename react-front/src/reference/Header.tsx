import React from 'react';

interface HeaderProps {
    title: string;
    secondLine?: string;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, secondLine='', subtitle }) => {
    return (
        <div className="text-white text-left">
            <div className="text-3xl mb-5">{title}<br/>{secondLine}</div>
            <div className="text-xl">{subtitle}</div>
        </div>
    );
};

export default Header;
