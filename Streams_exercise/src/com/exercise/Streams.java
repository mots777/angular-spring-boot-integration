package com.exercise;

import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

public class Streams {

	public static void main(String[] args) {
		Stream<Integer> stream = Stream.of(1,2,3,4,5,6,7,8,9);
//        stream.forEach(p -> System.out.println(p));
        
        List<Integer> evenNumbersList = stream.filter(i -> i%2 == 0).collect(Collectors.toList());
//        evenNumbersList.forEach(p -> System.out.println(p));
        IntStream.range(1,10).forEach(System.out::print);
        System.out.println();
        IntStream.range(1,10).skip(5).forEach(x -> System.out.print(x));
        
        System.out.println();
        System.out.print(IntStream.range(1,10).sum());
        System.out.println();
        
        Stream.of("adil","mothi","hanumanth").sorted().findFirst().ifPresent(System.out::println);
        System.out.println();
        String[] strArr = {"adil","mothi","melvin","hanumanth"};
        Arrays.stream(strArr).filter(x -> x.startsWith("m")).sorted().forEach(System.out::println);
        System.out.println();
        Arrays.stream(new int[] {1,2,3}).map(x -> x * x).average().ifPresent(System.out::println);
        System.out.println();
        List<String> people = Arrays.asList("adil","mothi","melvin","hanumanth");
        people.stream().map(String::toLowerCase).filter(x -> x.startsWith("a")).forEach(System.out::println);
        System.out.println();
        Double sum = Stream.of(1.0, 2.5, 3.0).reduce(0.0, (Double a, Double b) -> a + b);
        System.out.println(sum);
        System.out.println();
        IntSummaryStatistics summary = IntStream.of(1,2,3,4,5,10,44).summaryStatistics();
        System.out.println(summary);
        
	}

}
