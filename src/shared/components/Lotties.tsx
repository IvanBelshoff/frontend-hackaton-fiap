/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import Lottie from 'react-lottie';
import * as animationData404 from '../../../public/animated-illustrations/404 Error Page.json';
import * as animationDataDenied from '../../../public/animated-illustrations/denied.json';

interface LottieControlProps {
    type: 'empty' | '404' | 'chart' | 'lock' | 'denied' | 'noSearch' | 'job' | 'noOrders';
    width?: number;
    height?: number;
}

interface Options {
    /**
     * Defines if the animation should play only once or repeatedly in an endless loop
     * or the number of loops that should be completed before the animation ends
     */
    loop?: boolean | number | undefined;
    /**
     * Defines if the animation should immediately play when the component enters the DOM
     */
    autoplay?: boolean | undefined;
    /**
     * The JSON data exported from Adobe After Effects using the Bodymovin plugin
     */
    animationData: any;
    rendererSettings?: {
        preserveAspectRatio?: string | undefined;
        /**
         * The canvas context
         */
        context?: any;
        scaleMode?: any;
        clearCanvas?: boolean | undefined;
        /**
         * Loads DOM elements when needed. Might speed up initialization for large number of elements. Only with SVG renderer.
         */
        progressiveLoad?: boolean | undefined;
        /**
         * Hides elements when opacity reaches 0. Only with SVG renderer.
         * @default true
         */
        hideOnTransparent?: boolean | undefined;
        className?: string | undefined;
    } | undefined;
}

class LottieControl extends React.Component<LottieControlProps> {

    render() {

        const { type, width, height } = this.props;

        const defaultOptions404: Options = {
            loop: true,
            autoplay: true,
            animationData: JSON.parse(JSON.stringify(animationData404)),
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };

        const defaultOptionsDenied: Options = {
            loop: true,
            autoplay: true,
            animationData: JSON.parse(JSON.stringify(animationDataDenied)),
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        };

        let defaultOptions: Options = {} as Options;

        if (type === '404') {
            defaultOptions = defaultOptions404;
        } else {
            defaultOptions = defaultOptionsDenied;
        }

        return (
            <Lottie
                options={defaultOptions}
                height={height || 350}
                width={width || 350}
                style={{ cursor: 'default' }}
                isClickToPauseDisabled
            />
        );
    }
}

export default function Lotties({ type, width, height }: LottieControlProps) {
    return (
        <div>
            <LottieControl type={type} width={width} height={height} />
        </div>
    );
}
