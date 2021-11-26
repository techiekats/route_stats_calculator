import { EventEnum } from "./types/EventEnum";
import ILogger from "./types/ILogger";
import Logger from "./types/Logger";
import StatsGenerator from "./types/StatsGenerator";
var fs = require('fs');

main(process.argv);

function main(argv: string[]) {
    var logger:ILogger = new Logger();
    if (argv.length <3) {
        logger.LogException('Invalid input', 'CSV log was not provided');
    }
    else {
        var theNextMoveOptimizer = new StatsGenerator();
        fs.readFile(argv[2], 'utf8', function(err:string, data:string) {
            if (err) throw err;
            var rows = data.split('\n');
            logger.LogInfo(rows.length.toString());
            rows.forEach(r=>{
                var columns = r.split(',');
                if (!Date.parse(columns[0])) {
                    logger.LogWarning("Invalid row identified", r);
                }
                else {
                    var eventType: EventEnum = EventEnum.INVALID;
                    if (columns[3].startsWith(EventEnum.REQUEST))   eventType = EventEnum.REQUEST;
                    if (columns[3].startsWith(EventEnum.PICKUP))   eventType = EventEnum.PICKUP;
                    if (columns[3].startsWith(EventEnum.DROPOFF))   eventType = EventEnum.DROPOFF;
                    theNextMoveOptimizer.AddRecord(
                        columns[1], 
                        columns[2], 
                        new Date(columns[0]), 
                        eventType
                    );
                }
            });           
            var frequency = theNextMoveOptimizer.GetEventFrequency();
            console.log(frequency);
        });        
    }
}

