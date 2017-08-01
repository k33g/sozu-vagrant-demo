# sozu-vagrant-demo

This is a Vagrant demonstration of Sōzu, the ✨ reverse proxy raised at [Clever-Cloud](https://www.clever-cloud.com/). You cand find more informations about Sōzu here:

- [https://github.com/sozu-proxy/sozu](https://github.com/sozu-proxy/sozu)
- [https://www.sozu.io/](https://www.sozu.io/)
- [Hot reloading configuration: why and how?](https://www.clever-cloud.com/blog/engineering/2017/07/24/hot-reloading-configuration-why-and-how/)

## Prerequisites

- Install VirtualBox
- Install Vagrant
- Clone this repository: `git clone git@github.com:k33g/sozu-vagrant-demo.git`

## Run

### Ignition

```shell
cd sozu-vagrant-demo
vagrant up
```

It could be lonf, so ... ☕️  or ☕️

### Play

Now you should have 7 virtual machines:

```shell
webapp1         192.168.1.21:8080
webapp2         192.168.1.22:8080
webapp3         192.168.1.23:8080
webapp_new1     192.168.1.31:8080
webapp_new2     192.168.1.32:8080
webapp_new3     192.168.1.33:8080
sozuapp         192.168.1.99:8080 
```

- the VMs 1, 2 and 3 contain an **Express** web application (the same, but with a name generated at run time)
- the VMs 4, 5 and 6 contain the version 2 of the **Express** web application
- the last VM contains the Sōzu reverse proxy 
  - the ip of Sōzu is `192.168.1.99` and listen on `8080`
  - I added this in my `hosts` file `192.168.1.99 sozu.local`
  - then now, you'll connect to it with [http://sozu.local:8080/](http://sozu.local:8080/)

#### Remove application(s)

```shell
vagrant ssh sozuapp
cd sozu-project/
sudo ./sozu/target/debug/sozuctl --config ./demo.toml  backend remove --id webapp --ip 192.168.1.21 --port 8080
sudo ./sozu/target/debug/sozuctl --config ./demo.toml  backend remove --id webapp --ip 192.168.1.22 --port 8080
sudo ./sozu/target/debug/sozuctl --config ./demo.toml  backend remove --id webapp --ip 192.168.1.23 --port 8080
```

#### Add application(s)

```shell
vagrant ssh sozuapp
cd sozu-project/
sudo ./sozu/target/debug/sozuctl --config ./demo.toml  backend add --id webapp --ip 192.168.1.31 --port 8080
sudo ./sozu/target/debug/sozuctl --config ./demo.toml  backend add --id webapp --ip 192.168.1.32 --port 8080
sudo ./sozu/target/debug/sozuctl --config ./demo.toml  backend add --id webapp --ip 192.168.1.33 --port 8080
```

## Resources

You can read these 2 🇫🇷 blog posts:

- [http://k33g.github.io/2017/07/29/SOZU-1-FR.html](http://k33g.github.io/2017/07/29/SOZU-1-FR.html)
- [http://k33g.github.io/2017/08/31/SOZU-2-FR.html](http://k33g.github.io/2017/08/31/SOZU-2-FR.html)
