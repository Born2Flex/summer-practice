function PageContent({ title, children }: { title: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col w-fit mx-auto">
            <h1>{title}</h1>
            {children}
        </div>
    );
}

export default PageContent;
