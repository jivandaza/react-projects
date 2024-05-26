import { MdHomeFilled } from "react-icons/md";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";

export const navigation = [
    {
        label: 'Programas TV',
        href: 'tv',
        icon: <PiTelevisionFill />
    },
    {
        label: 'Películas',
        href: 'pelicula',
        icon: <BiSolidMoviePlay />
    }
];

export const mobileNavigation = [
    {
        label: 'Inicio',
        href: '/',
        icon: <MdHomeFilled />
    },
    ...navigation
];

export const routeNavigation = [
    {
        href: '/'
    },
    {
        href: 'buscar'
    },
    {
        href: 'tv'
    },
    {
        href: 'pelicula'
    }
]