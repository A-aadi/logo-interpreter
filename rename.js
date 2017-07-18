var fs = require('fs');
const outputDir = "./"+ process.argv[3]+"/"

const renameFileNames = () => {
    const inputFileNames = getInputFileList();
    inputFileNames.forEach((filename, index) => {
        if(index == 0)
            changeFileName(outputDir + "logo_drawing.png", outputDir + filename.split(".")[0] + "_image.png")
        else
            changeFileName(outputDir + "logo_drawing ("+ index + ").png", outputDir + filename.split(".")[0] + "_image.png")
    });
};

const changeFileName = (currentName, presentName) => {
    fs.rename(currentName, presentName, function (err) {
        if (err) throw err;
        console.log('renamed complete');
    });
}

const getInputFileList = () => fs.readFileSync(process.argv[2], 'utf-8').split('\n');

renameFileNames();