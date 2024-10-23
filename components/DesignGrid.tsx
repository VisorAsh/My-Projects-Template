"use client";
import { useEffect, useState } from 'react';

interface DesignGridProps {
    // En pixel
    columns?: number;
    padding?: number;
    margin?: number | {
        top?: number;
        right?: number;
        bottom?: number;
        left?: number;
    };
    gutter?: number;
    columnColor?: string;
    opacity?: number;
    zIndex?: number;
    defaultVisible?: boolean;
    className?: string;
    children?: React.ReactNode;
}

const DesignGrid = ({
    columns = 12,
    padding = 0,
    margin = 0,
    gutter = 24,
    columnColor = '#6366F1',
    opacity = 0.1,
    zIndex = 50,
    defaultVisible = false,
    className = '',
    children
}: DesignGridProps) => {
    const [mounted, setMounted] = useState(false);
    const [isVisible, setIsVisible] = useState(defaultVisible);

    // N'initialiser l'état de visibilité qu'après le montage côté client
    useEffect(() => {
        setMounted(true);
        setIsVisible(defaultVisible);
    }, [defaultVisible]);

    // Gérer les marges selon le type passé
    const getMarginStyle = () => {
        if (typeof margin === 'number') {
            return {
                marginTop: `${margin}px`,
                marginRight: `${margin}px`,
                marginBottom: `${margin}px`,
                marginLeft: `${margin}px`,
            };
        }
        return {
            marginTop: margin.top ? `${margin.top}px` : '0',
            marginRight: margin.right ? `${margin.right}px` : '0',
            marginBottom: margin.bottom ? `${margin.bottom}px` : '0',
            marginLeft: margin.left ? `${margin.left}px` : '0',
        };
    };

    // Calcul de la largeur d'une colonne
    const columnWidth = `calc((100% - ${padding * 2}px - ${gutter * (columns - 1)}px) / ${columns})`;

    const GridOverlay = () => {
        if (!mounted || !isVisible) return null;

        return (
            <div
                className="fixed inset-0 pointer-events-none"
                style={{ zIndex }}
            >
                <div
                    className="h-full mx-auto text-center"
                    style={{
                        ...getMarginStyle()
                    }}
                >
                    <div
                        className="h-full flex"
                        style={{ padding: `0 ${padding}px` }}
                    >
                        {Array.from({ length: columns }).map((_, index) => (
                            <div
                                key={index}
                                className="h-full"
                                style={{
                                    width: columnWidth,
                                    backgroundColor: columnColor,
                                    opacity,
                                    marginLeft: index === 0 ? 0 : `${gutter}px`
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // Bouton de contrôle avec informations sur les dimensions
    const GridControls = () => {
        if (!mounted) return null;

        return (
            <div className="fixed bottom-4 right-4 flex items-center gap-4 z-50">
                <div className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm">
                    {`${gutter}px - ${columns} colonnes`}
                </div>
                <button
                    type="button"
                    onClick={() => setIsVisible(!isVisible)}
                    className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`transition-transform ${isVisible ? 'rotate-45' : ''}`}
                    >
                        <path 
                        d="M2 2V14M8 2V14M14 2V14M2 2H14M2 8H14M2 14H14" 
                        stroke="currentColor" 
                        strokeWidth="1.5"
                        />
                    </svg>
                    {isVisible ? 'Masquer la grille' : 'Afficher la grille'}
                </button>
            </div>
        );
    };

    return (
        <div className={`relative ${className}`}>
            <GridOverlay />
            <GridControls />

            {/* Conteneur principal avec marges */}
            <div 
                style={{
                    padding: `0 ${padding}px`,
                    margin: '0 auto',
                    ...getMarginStyle()
                }}
            >
                {children}
            </div>
        </div>
    );
};

export { DesignGrid };
export type { DesignGridProps };
