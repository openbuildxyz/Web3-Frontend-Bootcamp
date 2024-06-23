import React from 'react';
import LayoutProps from './LayoutProps';
import styles from './DefaultLayout.module.css';
import Dock from '@/components/Dock'
import {cn} from "@/lib/utils.ts";
import {Toaster} from "@/components/ui/sonner"

const DefaultLayout: React.FC<LayoutProps> = ({children}) => {
    return (
        <div className={cn('relative z-[1]', styles.layout)}>
            <header className={styles.header}>
                {/* 导航栏 */}
            </header>
            <main className={styles.main}>
                {children}
                <Dock></Dock>
            </main>
            <footer className={styles.footer}>
                {/* 页脚 */}
                <p>© 2024 小莫唐尼</p>
            </footer>

            <Toaster/>
        </div>
    );
};

export default DefaultLayout;
