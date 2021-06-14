import { useAsync } from './use-async';
import {projectProps} from '../../src/screens/projectlist/list';
import {useEffect} from 'react';
import { cleanObject } from '../utils';
import { useHttp } from '../utils/http';


export const useProjects = (param?: Partial<projectProps>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<projectProps[]>()
    useEffect(()=> {
        run(client('projects', {data: cleanObject(param || {})}))
      }, [param])
    return result
}