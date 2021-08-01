BeatDetect = class{

    detectBeat(spectrum){
        let sum = 0;
        let isBeat = false;
        for(let i = 0; i < spectrum.length; i++){
            sum += spectrum[i] * spectrum[i];
        }

        if(sampleBuffer.length === 60){
            //detect a beat
            let sampleSum = 0;
            for(let i = 0; i < sampleBuffer.length; i++){
                sampleSum += sampleBuffer[i];
            }
            let sampleAverage = sampleSum / sampleBuffer.length;
            let c = this.calculateConstant(sampleAverage);
            if(sum > sampleAverage * c){
                //beat
                isBeat = true;
            }
            sampleBuffer.splice(0, 1);
            sampleBuffer.push(sum);
        }else{
            sampleBuffer.push(sum);
        }
        return isBeat;
    }

    calculateConstant(sampleAverage){
        let varianceSum = 0;
        for(let i = 0; i < sampleBuffer.length; i++){
            varianceSum += sampleBuffer[i] - sampleAverage;
        }
        let variance = varianceSum/sampleBuffer.length;
        let m = -0.15 / (25-200);
        let b = 1 + (m * 200);
        return (m * variance) + b;
    }
}