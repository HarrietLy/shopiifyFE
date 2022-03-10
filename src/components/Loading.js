
function Icon() {
    return (
        <div style={{width:'100px',height:'100px'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                <g fill="#aaa">
                    <path
                        d="M85.511-1010.2c-82.584 4.192-154.6 48.523-196.98 113.89l85.781 49.607C-.71-882.308 39.54-906.382 85.542-909.38v-100.82h-.031z"
                        transform="translate(151.625 1010.25)"
                    >
                        <animate
                            id="p1"
                            fill="freeze"
                            attributeName="fill"
                            attributeType="XML"
                            begin="0s; p6.end"
                            dur="0.08s"
                            from="#333"
                            to="#aaa"
                        ></animate>
                    </path>
                    <path
                        d="M111.14-1010.2v101.35c44.506 4.758 83.092 29.309 106.83 64.687l90.205-52.152c-42.394-65.388-114.42-109.72-197.04-113.89z"
                        transform="translate(151.625 1010.25)"
                    >
                        <animate
                            id="p2"
                            fill="freeze"
                            attributeName="fill"
                            attributeType="XML"
                            begin="p1.end"
                            dur="0.1s"
                            from="#333"
                            to="#aaa"
                        ></animate>
                    </path>
                    <path
                        d="M-124.33-874.18c-17.473 34.173-27.297 72.92-27.297 113.95 0 41.029 9.824 79.745 27.297 113.92l86.973-50.298c-9.664-19.671-15.092-41.818-15.092-65.221 0-22.43 4.977-43.692 13.899-62.74l-85.781-49.607z"
                        transform="translate(151.625 1010.25)"
                    >
                        <animate
                            id="p6"
                            fill="freeze"
                            attributeName="fill"
                            attributeType="XML"
                            begin="p5.end"
                            dur="0.2s"
                            from="#333"
                            to="#aaa"
                        ></animate>
                    </path>
                    <path
                        d="M321.05-874.18l-90.675 52.403c8.12 18.323 12.644 38.606 12.644 59.943 0 22.317-4.968 43.483-13.805 62.457l91.805 53.063c17.477-34.176 27.359-72.884 27.359-113.92 0-41.029-9.855-79.776-27.328-113.95z"
                        transform="translate(151.625 1010.25)"
                    >
                        <animate
                            id="p3"
                            fill="freeze"
                            attributeName="fill"
                            attributeType="XML"
                            begin="p2.end"
                            dur="0.2s"
                            from="#333"
                            to="#aaa"
                        ></animate>
                    </path>
                    <path
                        d="M216.44-677.17c-23.852 34.163-61.743 57.738-105.3 62.394v104.52c82.625-4.163 154.64-48.496 197.04-113.89l-91.742-53.032z"
                        transform="translate(151.625 1010.25)"
                    >
                        <animate
                            id="p4"
                            fill="freeze"
                            attributeName="fill"
                            attributeType="XML"
                            begin="p3.end"
                            dur="0.08s"
                            from="#333"
                            to="#aaa"
                        ></animate>
                    </path>
                    <path
                        d="M-24.084-674.65l-87.381 50.518c42.379 65.37 114.4 109.7 197 113.88v-103.99c-45.02-2.934-84.548-26.05-109.63-60.415z"
                        transform="translate(151.625 1010.25)"
                    >
                        <animate
                            id="p5"
                            fill="freeze"
                            attributeName="fill"
                            attributeType="XML"
                            begin="p4.end"
                            dur="0.1s"
                            from="#333"
                            to="#aaa"
                        ></animate>
                    </path>
                </g>
            </svg>
        </div>
    );
}

export default Icon;