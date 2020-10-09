class TownElement {
    constructor(name, buildYear) {
        this.name = name;
        this.buildYear = buildYear;
    }

    getName() {
        return this.name;
    }

    getYearBuilt() {
        return this.buildYear;
    }

    calcAge() {
        this.age = new Date().getFullYear() - this.buildYear;
    }

    getAge() {
        if (this.age === undefined) {
            this.calcAge();
        }

        return this.age;
    }
}

class Park extends TownElement {
    constructor(name, buildYear, area, numTrees) {
        super(name, buildYear);
        this.area = area;
        this.numTrees = numTrees;
    }

    getNumberTrees() {
        return this.numTrees;
    }

    getArea() {
        return this.area;
    }

    getTreeDensity() {
        return this.numTrees / this.area;
    }


}

class Street extends TownElement {
    constructor(name, buildYear, length, size = 3) {
        super(name, buildYear);
        this.length = length;
        this.size = size;
    }

    getLength() {
        return this.length;
    }

    getStreetClassification() {
        switch(true) {
            case this.size === 1: return 'tiny';
            case this.size === 2: return 'small';
            case this.size === 3: return 'normal';
            case this.size === 4: return 'big';
            case this.size === 5: return 'huge';
            default: return 'normal';
        }
    }

}

class ReportGenerator {
    constructor(parks, streets) {
        this.parks = parks;
        this.streets = streets;
    }

    generateParksReport() {
        this.parksReport = '----PARKS REPORT----\n';
        this.parksReport += `Our ${this.parks.length} parks have an average age of ${this.calcAverageAgeParks()} years.\n`
        
        this.parks.forEach(park => this.parksReport += `${park.getName()} has a tree density of ${park.getTreeDensity()} trees per square km.\n`)

        this.parks.forEach(park => {
            if (park.getNumberTrees() > 1000) {
                this.parksReport += `${park.getName()} has more than 1000 trees.\n`;
            }
        })
    }

    getParksReport() {
        if (this.parksReport === undefined) {
            this.generateParksReport();
        }
        
        return this.parksReport;
        
    }

    calcAverageAgeParks() {
        let totalAge = 0;

        this.parks.forEach(park => totalAge += park.getAge());

        return totalAge / this.parks.length;
    }

    generateStreetsReport() {
        this.streetsReport = '----STREETS REPORT----\n';
        this.streetsReport += `Our ${this.streets.length} streets have a total length of ${this.getTotalStreetsLength()} km, with an average of ${this.getAverageStreetLength()} km.\n`;

        this.streets.forEach(street => this.streetsReport += `${street.getName()}, built in ${street.getYearBuilt()}, is a ${street.getStreetClassification()} street.\n`)
    }

    getStreetsReport() {
        if(this.streetsReport === undefined) {
            this.generateStreetsReport();
        }

        return this.streetsReport;
    }

    calcTotalStreetsLength() {
        this.totalStreetsLength = 0;

        this.streets.forEach(street => this.totalStreetsLength += street.getLength());
    }

    getTotalStreetsLength() {
        if (this.totalStreetsLength === undefined) {
            this.calcTotalStreetsLength();
        }

        return this.totalStreetsLength;
    }

    calcAverageStreetLength() {
        this.averageStreetLength = this.getTotalStreetsLength() / this.streets.length;
    }

    getAverageStreetLength() {
        if (this.averageStreetLength === undefined) {
            this.calcAverageStreetLength();
        }

        return this.averageStreetLength;
    }
    
}

const allParks = [new Park('Green Park', 1987, 0.2, 215), new Park('National Park', 1894, 2.9, 3541), new Park('Oak Park', 1953, 0.4, 949)];

const allStreets = [new Street('Ocean Avenue', 1999, 1.1, 4), new Street('Evergreen Street', 2008, 2.7, 2), new Street('4th Street', 2015, 0.8), new Street('Sunset Boulevard', 1982, 2.5, 5)];

let reporter = new ReportGenerator(allParks, allStreets);

console.log(reporter.getParksReport());
console.log(reporter.getStreetsReport());