package com.example.forecastbackend.ml;

class Couple<A,B>
{
    A first;
    B second;

    public Couple(A first, B second) {
        this.first = first;
        this.second = second;
    }

    public static <A,B> Couple<A,B> of(A a,B b)
    {
        return new Couple<A,B>(a,b);
    }

}

class Triplet<A,B,C>
{
    A first;
    B second;
    C third;

    public Triplet(A first, B second, C third) {
        this.first = first;
        this.second = second;
        this.third = third;
    }

    public static <A,B,C> Triplet<A,B,C> of(A a,B b,C c)
    {
        return new Triplet<A,B,C>(a,b,c);
    }

}

class Quadruplet<A,B,C,D>
{
    A first;
    B second;
    C third;
    D fourth;

    public Quadruplet(A first, B second, C third,D fourth) {
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
    }

    public static <A,B,C,D> Quadruplet<A,B,C,D> of(A a,B b,C c,D d)
    {
        return new Quadruplet<A,B,C,D>(a,b,c,d);
    }

}

class Quintuplet<A,B,C,D,E>
{
    A first;
    B second;
    C third;
    D fourth;
    E fifth;

    public Quintuplet(A first, B second, C third,D fourth,E fifth) {
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
        this.fifth = fifth;
    }

    public static <A,B,C,D,E> Quintuplet<A,B,C,D,E> of(A a,B b,C c,D d,E e)
    {
        return new Quintuplet<A,B,C,D,E>(a,b,c,d,e);
    }

}