BOX_IMAGE = "bento/ubuntu-17.04"
NODE_COUNT = 3

Vagrant.configure(2) do |config|
	config.vm.box = BOX_IMAGE

  # N Web Apps
	(1..NODE_COUNT).each do |i|
    config.vm.define "webapp#{i}" do |node|

      node.vm.network :forwarded_port, guest: 8080, host: 9090 + i
      
      node.vm.network "public_network", ip: "192.168.1.2#{i}", bridge: "en0: Wi-Fi (AirPort)"
      
			node.vm.provider "virtualbox" do |node|
        node.memory = 256
        node.cpus = 1
      end
      
      node.vm.synced_folder '.', '/vagrant', disabled: true
      node.vm.provision "file", source: "./hello-earth-v1", destination: "hello-earth"
      
      node.vm.provision :shell, inline: <<-SHELL
        echo "👋 Installing NodeJS..."
        apt-get install curl python-software-properties -y
        curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
        apt-get install nodejs -y
        cd hello-earth
        npm install
        echo "😜 webapp is installed bye! 👋👋👋"
        nohup npm start > /dev/null 2>&1 & 
      SHELL
		end
  end 
  
  # N new Web Apps
	(1..NODE_COUNT).each do |i|
    config.vm.define "webapp_new#{i}" do |node|

      node.vm.network :forwarded_port, guest: 8080, host: 9100 + i

      node.vm.network "public_network", ip: "192.168.1.3#{i}", bridge: "en0: Wi-Fi (AirPort)"

			node.vm.provider "virtualbox" do |node|
        node.memory = 256
        node.cpus = 1
      end
      
      node.vm.synced_folder '.', '/vagrant', disabled: true
      node.vm.provision "file", source: "./hello-earth-v2", destination: "hello-earth"
      
      node.vm.provision :shell, inline: <<-SHELL
        echo "👋 Installing NodeJS..."
        apt-get install curl python-software-properties -y
        curl -sL https://deb.nodesource.com/setup_7.x | sudo bash -
        apt-get install nodejs -y
        cd hello-earth
        npm install
        echo "😜 webapp is installed bye! 👋👋👋"
        nohup npm start > /dev/null 2>&1 &         
      SHELL
		end
  end
  
  # Sōzu
  config.vm.define "sozuapp" do |node| 

    node.vm.network :forwarded_port, guest: 8080, host: 9090
    node.vm.network "public_network", ip: "192.168.1.99", bridge: "en0: Wi-Fi (AirPort)"

    node.vm.provider "virtualbox" do |v|
      v.memory = 256
      v.cpus = 1
    end

    node.vm.provision "file", source: "./sozu-project", destination: "sozu-project"

    node.vm.provision :shell, inline: <<-SHELL
      echo "👋 Installing Rust..."
      apt-get install curl -y
      apt-get install pkg-config -y
      # resources: https://github.com/liuchong/docker-rustup
      curl -sf -L https://static.rust-lang.org/rustup.sh | sh -s -- -y
      echo "😜 Rust is installed!"
      echo "👋 git clone Sōzu..."
      cd sozu-project
      git clone https://github.com/sozu-proxy/sozu 
      cd sozu
      echo "👋 compiling Sōzu..."
      cd ctl && cargo build; cd ../bin && cargo build
      echo "😜 Sōzu is installed"
      echo "⚠️ Don't forget to add sozu.local to your /etc/hosts"
      echo "🌍 Open http://sozu.local:8080"
      echo "❤️ Enjoy Sōzu!"
      echo "bye! 👋👋👋"
      # run Sōzu
      cd ../..
      nohup ./sozu/target/debug/sozu start -c ./demo.toml > /dev/null 2>&1 & 
    SHELL

  end

end
