---
layout: post
title: "New API client library: Perl"
date: 2012-01-03
authors:
  - name: Delano
    to: https://docs.onetimesecret.com/about
    avatar:
      src: /img/portait-profile-pic-delano-2024.jpeg
badge:
  label: Tools
---

We now have a perl client library for our [API](https://onetimesecret.com/docs/api/) thanks to <a href="https://metacpan.org/author/KYLED">Kyle Dawkins</a>. The code is available on [Github](https://github.com/quile/onetime-perl) and [CPAN](https://metacpan.org/dist/Net-OneTimeSecret/view/lib/Net/OneTimeSecret.pm). Here's an example:

```perl
#!/usr/bin/env perl

use Net::OneTimeSecret;

# Note: replace these with yours in order for this to work!
my $customerId  = 'example@onetimesecret.com';
my $testApiKey  = '4dc74a03fwr9aya5qur5wa8vavo4gih1hasj6181';

my $api = Net::OneTimeSecret->new( $customerId, $testApiKey );
my $result = $api->shareSecret( 'Jazz, jazz and more jazz.',
                   passphrase => 'thepassword',
                   recipient => 'kyle@shoffle.com',
                   ttl => 7200,
                 );
printf( "%s\n", $result->{secret_key} );

my $secret = $api->retrieveSecret( $result->{secret_key}, passphrase => "thepassword" );
printf( "%s\n", $secret->{value} );

```

*If you implement a client library in another language, let us know and we'll post about it here.*
