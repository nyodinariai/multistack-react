import React from "react";
import { JobDataContainer, JobInformationContainer, JobInformationIcon } from "./JobInformation.styled";
//import { } from '@mui/material'
//import { Component } from './JobInformation.styled'

export interface JobInformationProps{}

const JobInformation: React.FC<JobInformationProps> = ({children}) =>{

    return (
        <JobInformationContainer>
            <JobInformationIcon className={'twf-check-circle'} />

            <JobDataContainer>{children}</JobDataContainer>
        </JobInformationContainer>
    );
}

export default JobInformation;
