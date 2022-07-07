import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, FormControlLabel, Checkbox, Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import { ReactNode, useEffect, useState } from "react"
import { TestType } from "../../models/test"
import { Difficulty } from '../../models/test/difficulty'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { DateRangePicker } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main style file
import 'react-date-range/dist/theme/default.css' // theme css file

interface IFilter {
    onChange: Function,
    value: any
}

interface ISelectionRange {
    startDate?: Date,
    endDate?: Date,
    key: string
}

export const Filter = ({ onChange, value } : IFilter) => {
    const [showFilter, setShowFilter] = useState<boolean>(false)
    const [checked, setChecked] = useState<boolean>(false)
    const [selectionRange, setSelectionRange] = useState<ISelectionRange>({
        startDate: value.fromDate ?? new Date(),
        endDate: value.toDate ?? new Date(),
        key: 'selection'
    })
    
    useEffect(() => {
        const el = document.getElementsByClassName('rdrDefinedRangesWrapper')[0] as HTMLElement
        if (el) el.style.display = 'none'
    }, [])

    const handleChangeDifficulty = (event: SelectChangeEvent<any>, child: ReactNode) => {
        const newValue = event.target.value
        onChange({
           difficulty: newValue
        })    
    }

    const handleChangeTestType = (event: SelectChangeEvent<any>, child: ReactNode) => {
        const newValue = event.target.value
        onChange({
           type: newValue
        })    
    }

    const handleSelect = (ranges : any) => {
        setSelectionRange(ranges.selection)
    }

    const handleChange = (ev : any, expanded : boolean) => {
        setShowFilter(expanded)
    }

    const handleChangeCheckbox = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        onChange({
            fromDate: selectionRange.startDate?.toUTCString(),
            toDate: selectionRange.endDate?.toUTCString(),
            useDateFiltering: checked
        })
    }, [selectionRange, onChange, checked])

    return (
        <Accordion sx={{ marginBottom: 3 }} expanded={showFilter} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <FilterAltIcon />
                <Typography>Filters</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box sx={{ marginBottom: 3, marginTop: 3, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                    <FormControl sx={{ width: '45%' }}>
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                            value={value.difficulty ?? ''}
                            label="Difficulty"
                            onChange={handleChangeDifficulty}
                        >
                            <MenuItem value=''>All difficulties</MenuItem>
                            <MenuItem value={Difficulty.EASY}>Easy</MenuItem>
                            <MenuItem value={Difficulty.MEDIUM}>Medium</MenuItem>
                            <MenuItem value={Difficulty.HARD}>Hard</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl sx={{ width: '45%' }}>
                        <InputLabel>Type of test</InputLabel>
                        <Select
                            value={value.type ?? ''}
                            label="Type of test"
                            onChange={handleChangeTestType}
                        >
                            <MenuItem value=''>All tests</MenuItem>
                            <MenuItem value={TestType.Mimic}>Mimic</MenuItem>
                            <MenuItem value={TestType.Mimic_Error}>Mimic - Error test</MenuItem>
                            <MenuItem value={TestType.QA}>QA</MenuItem>
                            <MenuItem value={TestType.QA_Error}>QA - Error test</MenuItem>
                            <MenuItem value={TestType.OptionVideoToWord}>Video to word</MenuItem>
                            <MenuItem value={TestType.OptionVideoToWord_Error}>Video to word - Error test</MenuItem>
                            <MenuItem value={TestType.OptionWordToVideo}>Word to video</MenuItem>
                            <MenuItem value={TestType.OptionWordToVideo_Error}>Word to video - Error test</MenuItem>
                        </Select>   
                    </FormControl>
                </Box>

                <FormControlLabel 
                    control={
                        <Checkbox checked={checked}
                            onChange={handleChangeCheckbox}
                            inputProps={{ 'aria-label': 'controlled' }}
                        />
                    } 
                    label="Filter by date" 
                />

                <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <DateRangePicker
                        maxDate={new Date()}
                        ranges={[selectionRange]}
                        onChange={handleSelect}
                    />
                </Box>
            </AccordionDetails>
        </Accordion>
    )
}
