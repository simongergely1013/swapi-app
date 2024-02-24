import React from "react";
import Link from "next/link";

const styles = {
    main: "h-20 flex items-center justify-center bg-[#1F1934] text-[#D1D1D1] text-xl tracking-widest py-4 border-b border-slate-900"
}

const NavBar = () => {
    return (
        <div className={styles.main}><Link href={"/"}>SWAPI APP</Link></div>
    )
}

export default NavBar;