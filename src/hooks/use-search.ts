'use client'

import React, { useState } from 'react'
import { useDebounceValue as useDebounce } from 'usehooks-ts'

type OptionalPromise<T> = Promise<T> | T

interface UseSearchProps<T> {
  searchFn: (query: string) => OptionalPromise<T[]>
  debounceMs?: number
}

export function useSearch<T>({ searchFn }: UseSearchProps<T>) {
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<T[]>([])
  const [query, setQuery] = useState('')
  const [debouncedQuery, updateDebouncedQuery] = useDebounce(query, 100)
  const currentQueryRef = React.useRef<string>('')

  const resetInput = () => {
    setQuery('')
    updateDebouncedQuery('')
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setQuery('')
      updateDebouncedQuery('')
    }
  }

  const search = async ({ query }: { query: string }) => {
    if (query.trim() && searchFn) {
      currentQueryRef.current = query
      setIsLoading(true)
      try {
        const searchResults = await searchFn(query)
        if (currentQueryRef.current === query) {
          setResults(Array.isArray(searchResults) ? searchResults : [])
        }
      } catch (error) {
        console.error('Search error:', error)
        if (currentQueryRef.current === query) {
          setResults([])
        }
      } finally {
        if (currentQueryRef.current === query) {
          setIsLoading(false)
        }
      }
    } else {
      currentQueryRef.current = ''
      setResults([])
      setIsLoading(false)
    }
  }

  React.useEffect(() => {
    if (!Boolean(query?.trim())) {
      currentQueryRef.current = ''
      setResults([])
      setIsLoading(false)
      return
    }
  }, [query])

  React.useEffect(() => {
    if (debouncedQuery !== undefined && debouncedQuery.trim()) {
      search({ query: debouncedQuery })
    } else {
      currentQueryRef.current = ''
      setResults([])
      setIsLoading(false)
    }
  }, [debouncedQuery])

  return {
    query,
    isLoading,
    results,
    setQuery,
    handleKeyDown,
    resetInput,
  }
}
