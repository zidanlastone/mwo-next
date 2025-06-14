---
applyTo: '**/*.tsx'
---
- Every time a react component created, always use react arrow function component.
- Always create type definition on folde '/src/@types'
- Every time a page file created, always use props with proper type. and type files are stored on '/src/@types'.
- if i use useFetch hooks that stored in '/src/utils/hooks/use-fetch.tsx' always make code like
``` const const { data: result, isLoading: loading, error } = useFetch<AccesControll[]>('http://localhost:3000/access-control');```
it has type definion and error type in if the request has failed. then if the type has [] or collection always check if the result.data is array then render the component. eg
{{ Array.isArray(result.data) && (<div> </div>) }}

