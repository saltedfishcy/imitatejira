import { useAsync } from './use-async';
import {projectProps} from '../../src/screens/projectlist/list';
import {useEffect} from 'react';
import { cleanObject } from '../utils';
import { useHttp } from '../utils/http';
import {User} from '../screens/projectlist/searchpanel'


export const useUsers = (param?: Partial<User>) => {
    const client = useHttp()
    const { run, ...result } = useAsync<User[]>()
    useEffect(()=> {
        run(client('users', {data: cleanObject(param || {})}))
      }, [param])
    return result
}