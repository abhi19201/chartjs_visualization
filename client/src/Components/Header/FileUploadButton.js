import React,{useState, useRef, useEffect} from 'react'

export default function FileUploadButton() {

    const fileInput = useRef();
    const [file, setfile] = useState();
    const [numOfTS, setnumOfTS] = useState(0);
    const [fileName, setfileName] = useState("");
    const [mainFile, setmainFile] = useState();

    useEffect(() => {
        if (file && file[0].measure) {
            setmainFile([...file]);
            setnumOfTS(file.length);
            setfile();
        } else if (file) {
            setmainFile((prevFile) => {
                let oldObj = prevFile.find((f) => f._id === fileName);
                let newArr = prevFile.filter((f) => f !== oldObj);
                oldObj["timeSeries"] = file;
                newArr.push(oldObj);

                setnumOfTS((p) => {
                    return p - 1;
                });

                return [...newArr];
            });
        }
    }, [file, fileName]);

    const uploadHandler = () => {
        fileInput.current.click();
    };

    const getFile = (e) => {
        var reader = new FileReader();
        setfileName(e.target.files[0].name.split(".")[0]);
        reader.readAsText(e.target.files[0]);
        reader.onload = function () {
            setfile(JSON.parse(reader.result));
        };
    };


    return (
        <div>
            <button onClick={uploadHandler}> Upload </button>
            <input
                type='file'
                ref={fileInput}
                style={{ display: "none" }}
                onChange={(event) => {
                    if (event.target !== null) {
                        if (
                            event.target.files[0].name.split(".").pop() ===
                            "json"
                        ) {
                            getFile(event);
                        } else {
                            alert("Please select .json file !");
                        }
                    }
                }}></input>
        </div>
    );
}
