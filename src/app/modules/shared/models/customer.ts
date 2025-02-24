import { Status } from "./ Status";
import { Business } from "./business";
import { Entity } from "./entity";
import { Purpose } from "./purpose";
import { Shareholder } from "./shareholder";

export interface Customer {
    id: number;
    company: string;
    license?: string;
    country: string;
    registrationNumber: string;
    incorporationDate: Date;
    applicant: string;
    email: string;
    purposeDto: Purpose;
    entityTypeDto: Entity;
    businessDto: Business;
    shareholderDtos: Shareholder[];
    statusDto: Status;
}
