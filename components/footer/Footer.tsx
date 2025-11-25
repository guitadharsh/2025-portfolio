const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        // <footer>
            <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm text-gray-400">
                © {currentYear} Adharsh D. All rights reserved.
            </div>
        // </footer>
    )
}

export default Footer