Vagrant.configure("2") do |config|

    # avoid self signed SSL issues
    config.vm.box_download_insecure = true
    config.vm.network "forwarded_port", guest:80, host:8080, host_ip: "127.0.0.1"
    config.vm.network "forwarded_port", guest:9000, host:9000, host_ip: "127.0.0.1" # node

	# pull the Vagrant box
	config.vm.box="DockerNodeElastic Upgrade"
    # box url was redacted due to it being company specific. future version may include a public virtual box
    config.vm.box_url="yourbox.box"

    config.ssh.username="vagrant"
    config.ssh.password="vagrant"

    config.vm.synced_folder ".", "/vagrant",
    :mount_options => ["dmode=777", "fmode=777"]

    # optional
    config.vm.provider "virtualbox" do |v|
        v.memory=1024
    end

end
