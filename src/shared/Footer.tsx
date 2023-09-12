const Footer = () => {
    return (
        <footer className="p-4 text-center text-gray-500 text-sm">
            <div className="flex justify-center gap-4 mb-2 text-xs">
                <div>
                    <a href="http://">Github Repo</a>
                </div>
                <div>
                    <a href="http://">Linkedin Profile</a>
                </div>
            </div>
            <div>
                FlickPin &copy; Andrea Buonocore {new Date().getFullYear()}
            </div>
        </footer>
    )
}

export default Footer;