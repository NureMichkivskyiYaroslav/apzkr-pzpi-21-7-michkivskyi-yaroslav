import Header from "../Header/Header.tsx";
import styles from "./PageFrame.module.css";
import { ReactNode } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

interface PageFrameProps {
    children?: ReactNode;
}

export default function PageFrame({ children }: PageFrameProps) {
    return (
        <div className={styles.background}>
            <Header/>
            <ToastContainer/>
            <div className={styles.pageContent}>
                {children}
            </div>
        </div>
    );
}