import useAuthContext from "../hooks/useAuthContext.js";
import CustomLink from "./CustomLink";
import Portal from "./Portal";

function Header() {
    const { user } = useAuthContext();

    return (
        <header className="bg-toodark sticky top-0 z-50">
            <nav className='flex justify-between items-center h-[4rem] p-4 max-width'>
                <div className="text-white font-bold text-xl">
                    Expenses App
                </div>
                {user && (
                    <div className="flex flex-col xs:flex-row xs:space-x-2 justify-center items-center text-white">
                        <p>{user.email}</p>
                        <Portal action={"logout"} />
                    </div>
                )}
                {!user && (
                    <div className="text-white flex flex-row space-x-5">
                        <CustomLink to="/login" routeName="Login" />
                        <CustomLink to="/signup" routeName="Signup" />
                    </div>
                )}
            </nav>
        </header>
    )
}

export default Header;