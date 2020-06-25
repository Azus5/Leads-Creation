class FilesController < ApplicationController 

    # GET /files
    def index
        filePath = File.join(Rails.root, 'public', 'Exemplo.pdf')
        send_file(filePath, :type => "application/pdf", :disposition => "attachment")
    end

end