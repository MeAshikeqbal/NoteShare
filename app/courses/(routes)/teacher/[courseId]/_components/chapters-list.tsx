"use client"

import { Chapter } from "@prisma/client";
import { useState } from "react";


interface ChaptersListProps {
    items: Chapter[];
    onReorder: (updateDate:{
        id: string;
        position: number;
    }[]) => void;
    onEdit: (id: string) => void;
}

export const ChaptersList = ({
    items,
    onReorder,
    onEdit
}:ChaptersListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [chapters, setChapters] = useState(items);

    return (
        <div>
            <div>
                chapters list
            </div>
        </div>
    )
}