In order to see the optimisation optimization in action:

1. run the feature demo
2. open up React DevTools Profiler
3. click "reload and start profiling"
4. input any character into the search field
5. click "stop profiling"

In summary:

NO CPU THROTTLING

Initial render
- HeavyComponent (61.8ms)
- OptimizedHeavyComponent (61.4ms)

Re-render
- HeavyComponent (58.6ms)
- OptimizedHeavyComponent (0.2ms)

CPU THROTTLING 6x

Initial render
- HeavyComponent (315.8ms)
- OptimizedHeavyComponent (299.1ms)

Re-render
- HeavyComponent (309.7ms)
- OptimizedHeavyComponent (0.8ms)
