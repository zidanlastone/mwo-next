import classNames from '../utils/classNames'
import { ChevronDownIcon, ChevronUpDownIcon, ChevronUpIcon } from '@heroicons/react/20/solid'

export type SorterProps = {
    className?: string
    sort?: boolean | 'asc' | 'desc'
}

const Sorter = ({ sort, className }: SorterProps) => {
    const color = 'text-primary'

    const renderSort = () => {
        if (typeof sort === 'boolean') {
            return <ChevronUpDownIcon />
        }

        if (sort === 'asc') {
            return <ChevronUpIcon className={color} />
        }

        if (sort === 'desc') {
            return <ChevronDownIcon className={color} />
        }

        return null
    }

    return (
        <div className={classNames('inline-flex', className)}>
            {renderSort()}
        </div>
    )
}

export default Sorter
