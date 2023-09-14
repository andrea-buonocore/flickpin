const Footer = () => {
    return (
        <footer className="p-4 text-center text-gray-500 text-sm">
            <div className="flex justify-center gap-4 mb-2 text-xs">
                <div>
                    <a href="https://github.com/andrea-buonocore" target="_blank">Github Repo</a>
                </div>
                <div>
                    <a href="https://www.linkedin.com/in/andreabuonocore00/" target="_blank">Linkedin Profile</a>
                </div>
            </div>
            <div>
                FlickPin &copy; Andrea Buonocore {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer;