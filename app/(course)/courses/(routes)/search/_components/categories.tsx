"use client"

import { Catagory } from "@prisma/client"
import {
    FcEngineering,
    FcElectronics,
    FcFilmReel,
    FcOldTimeCamera,
    FcBusiness,
    FcGraduationCap,
    FcMusic,
    FcGlobe,
    FcDisplay,
} from "react-icons/fc"
import { FaComputer } from "react-icons/fa6";
import { MdEngineering } from "react-icons/md";
import { PiBooksFill } from "react-icons/pi";
import { IconType } from "react-icons"
import { CategoryItem } from "./category-item"


const iconMap: Record<Catagory["name"], IconType> = {
    "Software Engineering": FcEngineering,
    "Electrical Engineering": FcElectronics,
    "Film": FcFilmReel,
    "Photography": FcOldTimeCamera,
    "Business": FcBusiness,
    "Academics": FcGraduationCap,
    "Music": FcMusic,
    "Language": FcGlobe,
    "Design": FcDisplay,
    "Computer Science":  FaComputer,
    "Mechanical Engineering": MdEngineering,
    "Civil Engineering" : MdEngineering,
    "Art" : PiBooksFill ,
}

interface CategoriesProps {
    items: Catagory[]
}

export const Categories = ({
    items
}: CategoriesProps) => {
    return (
        <div className="flex items-center gap-x-2 overflow-x-auto pb-2">
            {items.map((item) => (
                <CategoryItem
                    key={item.id}
                    label={item.name}
                    icon={iconMap[item.name]}
                    value={item.id}
                />
            ))}
        </div>
    )
}